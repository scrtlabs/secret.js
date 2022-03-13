// For future wanderers:
// This file is written manually with a few goals in mind:
// 1. Proxy the auto-generated QueryClientImpl from "src/protobuf_stuff/secret/compute/v1beta1/query.tx" (See the "scripts/generate_protobuf.sh" script)
// 2. Abstract "address: Uint8Array" in the underlying types as "address: string".
// 3. Add Secret Network encryption

import { fromBase64, fromUtf8, toHex } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import { getMissingCodeHashWarning } from "..";
import { EncryptionUtils, EncryptionUtilsImpl } from "../encryption";

/** QueryContractInfoRequest is the request type for the Query/ContractInfo RPC method */
export type QueryContractInfoRequest = {
  /** address is the address of the contract to query */
  address: string;
};

/** QueryContractInfoResponse is the response type for the Query/ContractInfo RPC method */
export type QueryContractInfoResponse = {
  /** address is the address of the contract */
  address: string;
  ContractInfo: ContractInfo;
};

/** ContractInfo stores a WASM contract instance */
export type ContractInfo = {
  codeId: string;
  creator: string;
  label: string;
  created?: AbsoluteTxPosition;
};

/** AbsoluteTxPosition can be used to sort contracts */
export type AbsoluteTxPosition = {
  /** BlockHeight is the block the contract was created at */
  blockHeight: string;
  /** TxIndex is a monotonic counter within the block (actual transaction index, or gas consumed) */
  txIndex: string;
};

export type QueryContractsByCodeRequest = {
  codeId: string;
};

export type QueryContractsByCodeResponse = {
  contractInfos: ContractInfoWithAddress[];
};

/** ContractInfoWithAddress adds the address (key) to the ContractInfo representation */
export type ContractInfoWithAddress = {
  address: string;
  ContractInfo?: ContractInfo;
};

export type QueryContractRequest = {
  /** The address of the contract */
  address: string;
  /** The SHA256 hash value of the contract's WASM bytecode, represented as case-insensitive 64
   * character hex string.
   * This is used to make sure only the contract that's being invoked can decrypt the query data.
   *
   * codeHash is an optional parameter but using it will result in way faster execution time.
   *
   * Valid examples:
   * - "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "0xaf74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "AF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   * - "0xAF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   */
  codeHash?: string;
  /** A JSON object that will be passed to the contract as a query */
  query: any;
};

export type CodeInfoResponse = {
  codeId: string;
  creator: string;
  codeHash: string;
  source: string;
  builder: string;
};

export type QueryCodeResponse = {
  codeInfo: CodeInfoResponse;
  data: Uint8Array;
};

export class ComputeQuerier {
  private readonly grpc: import("../protobuf_stuff/secret/compute/v1beta1/query").GrpcWebImpl;
  private encryption?: EncryptionUtils;
  private client?: import("../protobuf_stuff/secret/compute/v1beta1/query").QueryClientImpl;
  private codeHashCache = new Map<string | number, string>();

  constructor(
    grpc: import("../protobuf_stuff/secret/compute/v1beta1/query").GrpcWebImpl,
    encryption?: EncryptionUtils,
  ) {
    this.grpc = grpc;
    this.encryption = encryption;
  }

  private async init() {
    if (!this.client) {
      this.client = new (
        await import("../protobuf_stuff/secret/compute/v1beta1/query")
      ).QueryClientImpl(this.grpc);
    }

    if (!this.encryption) {
      this.encryption = new EncryptionUtilsImpl(
        new (
          await import("../protobuf_stuff/secret/registration/v1beta1/query")
        ).QueryClientImpl(this.grpc),
      );
    }
  }

  /** Get codeHash of a Secret Contract */
  async contractCodeHash(address: string): Promise<string> {
    await this.init();

    let codeHash = this.codeHashCache.get(address);
    if (!codeHash) {
      const { ContractInfo } = await this.contractInfo(address);
      codeHash = (await this.codeHash(Number(ContractInfo.codeId)))
        .replace("0x", "")
        .toLowerCase();
      this.codeHashCache.set(address, codeHash);
    }

    return codeHash;
  }

  /** Get codeHash from a code id */
  async codeHash(codeId: number): Promise<string> {
    await this.init();

    let codeHash = this.codeHashCache.get(codeId);
    if (!codeHash) {
      const { codeInfo } = await this.code(codeId);
      codeHash = codeInfo.codeHash;
      this.codeHashCache.set(codeId, codeHash);
    }

    return codeHash;
  }

  /** Get metadata of a Secret Contract */
  async contractInfo(address: string): Promise<QueryContractInfoResponse> {
    await this.init();

    const response = await this.client!.contractInfo({
      address: addressToBytes(address),
    });

    return {
      address: bytesToAddress(response.address),
      ContractInfo: contractInfoFromProtobuf(response.ContractInfo!),
    };
  }

  /** Get all contracts that were instantiated from a code id */
  async contractsByCode(codeId: number): Promise<QueryContractsByCodeResponse> {
    await this.init();

    const response = await this.client!.contractsByCode({
      codeId: String(codeId),
    });

    return {
      contractInfos: response.contractInfos.map((x) => ({
        address: bytesToAddress(x.address),
        ContractInfo: x.ContractInfo
          ? contractInfoFromProtobuf(x.ContractInfo)
          : undefined,
      })),
    };
  }

  /** Query a Secret Contract */
  async queryContract({
    address,
    codeHash,
    query,
  }: QueryContractRequest): Promise<any> {
    await this.init();

    if (!codeHash) {
      console.warn(getMissingCodeHashWarning("queryContract()"));
      codeHash = await this.contractCodeHash(address);
    }
    codeHash = codeHash.replace("0x", "").toLowerCase();

    const encryptedQuery = await this.encryption!.encrypt(codeHash, query);
    const nonce = encryptedQuery.slice(0, 32);

    try {
      const { data: encryptedResult } = await this.client!.smartContractState({
        address: addressToBytes(address),
        queryData: encryptedQuery,
      });

      const decryptedBase64Result = await this.encryption!.decrypt(
        encryptedResult,
        nonce,
      );

      return JSON.parse(fromUtf8(fromBase64(fromUtf8(decryptedBase64Result))));
    } catch (err) {
      try {
        const errorMessageRgx =
          /encrypted: (.+?): (?:instantiate|execute|query) contract failed/g;
        const rgxMatches = errorMessageRgx.exec(err.message);
        if (rgxMatches == null || rgxMatches?.length != 2) {
          throw err;
        }

        const encryptedError = fromBase64(rgxMatches[1]);

        const decryptedBase64Error = await this.encryption!.decrypt(
          encryptedError,
          nonce,
        );

        try {
          return JSON.parse(
            fromUtf8(fromBase64(fromUtf8(decryptedBase64Error))),
          );
        } catch (parseError) {
          if (parseError.message === "Invalid base64 string format") {
            return JSON.parse(fromUtf8(decryptedBase64Error));
          } else {
            throw err;
          }
        }
      } catch (decryptionError) {
        throw err;
      }
    }
  }

  /** Get WASM bytecode and metadata for a code id */
  async code(codeId: number): Promise<QueryCodeResponse> {
    await this.init();

    const response = await this.client!.code({ codeId: String(codeId) });
    const codeInfo = codeInfoResponseFromProtobuf(response.codeInfo);

    this.codeHashCache.set(
      codeId,
      codeInfo.codeHash.replace("0x", "").toLowerCase(),
    );

    return {
      codeInfo,
      data: response.data,
    };
  }

  async codes(): Promise<CodeInfoResponse[]> {
    await this.init();

    const response = await this.client!.codes({});

    return response.codeInfos.map((codeInfo) =>
      codeInfoResponseFromProtobuf(codeInfo),
    );
  }
}

export function addressToBytes(address: string): Uint8Array {
  return Uint8Array.from(bech32.fromWords(bech32.decode(address).words));
}

export function bytesToAddress(bytes: Uint8Array): string {
  return bech32.encode("secret", bech32.toWords(bytes));
}

function contractInfoFromProtobuf(
  contractInfo: import("../protobuf_stuff/secret/compute/v1beta1/types").ContractInfo,
): ContractInfo {
  return {
    codeId: contractInfo.codeId,
    creator: bytesToAddress(contractInfo.creator),
    label: contractInfo.label,
    created: contractInfo.created,
  };
}

function codeInfoResponseFromProtobuf(
  codeInfo?: import("../protobuf_stuff/secret/compute/v1beta1/query").CodeInfoResponse,
): CodeInfoResponse {
  return codeInfo
    ? {
        codeId: codeInfo.codeId,
        creator: bytesToAddress(codeInfo.creator),
        codeHash: toHex(codeInfo.dataHash).replace("0x", "").toLowerCase(),
        source: codeInfo.source,
        builder: codeInfo.builder,
      }
    : {
        // This should never happen
        codeId: "",
        creator: "",
        codeHash: "",
        source: "",
        builder: "",
      };
}
