// For future wanderers:
// This file is written manually with a few goals in mind:
// 1. Proxy the auto-generated QueryClientImpl from "src/protobuf_stuff/secret/compute/v1beta1/query.tx" (See the "scripts/generate_protobuf.sh" script)
// 2. Abstract "address: Uint8Array" in the underlying types as "address: string".
// 3. Add Secret Network encryption

import { fromBase64, fromUtf8, toHex } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import { EncryptionUtilsImpl } from "../encryption";

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

/** QueryContractInfoRequest is the request type for the Query/ContractInfo RPC method */
export type QueryContractInfoRequest = {
  /** address is the address of the contract to query */
  address: string;
};

/** QueryContractInfoResponse is the response type for the Query/ContractInfo RPC method */
export type QueryContractInfoResponse = {
  /** address is the address of the contract */
  address: string;
  ContractInfo?: ContractInfo;
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

export type QueryContractRequest<T> = {
  /** The address of the contract */
  address: string;
  /** The SHA256 hash value of the contract's WASM bytecode, represented as case-insensitive 64 character hex string. This is used to make sure only the contract that's being invoked can decrypt the query data.
   *
   * Valid examples:
   * - "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "0xaf74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "AF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   * - "0xAF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   */
  codeHash: string;
  /** A JSON object that will be passed to the contract as a query */
  query: T;
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
  private readonly rpc: Rpc;
  private encryption?: EncryptionUtilsImpl;
  private client?: import("../protobuf_stuff/secret/compute/v1beta1/query").QueryClientImpl;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  private async init() {
    if (!this.client) {
      this.client = new (
        await import("../protobuf_stuff/secret/compute/v1beta1/query")
      ).QueryClientImpl(this.rpc);
    }

    if (!this.encryption) {
      this.encryption = new EncryptionUtilsImpl(
        new (
          await import("../protobuf_stuff/secret/registration/v1beta1/query")
        ).QueryClientImpl(this.rpc),
      );
    }
  }

  /** Get metadata of a Secret Contract */
  async contractInfo(address: string): Promise<QueryContractInfoResponse> {
    await this.init();

    const response = await this.client!.contractInfo({
      address: addressToBytes(address),
    });

    return {
      address: bytesToAddress(response.address),
      ContractInfo: response.ContractInfo
        ? contractInfoFromProtobuf(response.ContractInfo)
        : undefined,
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
  async queryContract<T extends object, R extends object>({
    address,
    codeHash,
    query,
  }: QueryContractRequest<T>): Promise<R> {
    await this.init();

    const encryptedQuery = await this.encryption!.encrypt(codeHash, query);
    const nonce = encryptedQuery.slice(0, 32);

    const { data: encryptedResult } = await this.client!.smartContractState({
      address: addressToBytes(address),
      queryData: encryptedQuery,
    });

    const decryptedBase64Result = await this.encryption!.decrypt(
      encryptedResult,
      nonce,
    );

    return JSON.parse(fromUtf8(fromBase64(fromUtf8(decryptedBase64Result))));
  }

  /** Get WASM bytecode and metadata for a code id */
  async code(codeId: number): Promise<QueryCodeResponse> {
    await this.init();

    const response = await this.client!.code({ codeId: String(codeId) });

    return {
      codeInfo: codeInfoResponseFromProtobuf(response.codeInfo),
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

export function bytesToAddress(
  bytes: Uint8Array,
  prefix: string = "secret",
): string {
  return bech32.encode(prefix, bech32.toWords(bytes));
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
        codeHash: toHex(codeInfo.dataHash),
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
