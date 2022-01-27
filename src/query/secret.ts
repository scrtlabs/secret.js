// For future wanderers:
// This file is written manually with a few goals in mind:
// 1. Proxy the auto-generated QueryClientImpl from "src/protobuf_stuff/secret/compute/v1beta1/query.tx" (See the "scripts/generate_protobuf.sh" script)
// 1. Abstract "address: Uint8Array" in the underlying types as "address: string".
// 2. Add Secret Network encryption

export { QueryClientImpl as RegistrationQuerier } from "../protobuf_stuff/secret/registration/v1beta1/query";
import {
  QueryClientImpl,
  CodeInfoResponse as ProtobufCodeInfoResponse,
} from "../protobuf_stuff/secret/compute/v1beta1/query";
import { ContractInfo as ProtobufContractInfo } from "../protobuf_stuff/secret/compute/v1beta1/types";
import { bech32 } from "bech32";
import { toHex } from "@cosmjs/encoding";

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

export type QueryContractRequest = {
  /** The address of the contract */
  address: string;
  /** The SHA256 hash value of the contract's WASM bytecode, represented as case-insensitive 64 character hex string.
   *
   * Valid examples:
   * - "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "0xaf74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "AF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   * - "0xAF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   */
  codeHash: string;
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
  codeInfo?: CodeInfoResponse;
  data: Uint8Array;
};

export class ComputeQuerier {
  private readonly client: QueryClientImpl;

  constructor(rpc: Rpc) {
    this.client = new QueryClientImpl(rpc);
  }

  /** Get metadata of a Secret Contract */
  async contractInfo(
    request: QueryContractInfoRequest,
  ): Promise<QueryContractInfoResponse> {
    const address = addressToBytes(request.address);
    const response = await this.client.contractInfo({
      address,
    });

    return {
      address: bytesToAddress(response.address),
      ContractInfo: response.ContractInfo
        ? contractInfoFromProtobuf(response.ContractInfo)
        : undefined,
    };
  }

  /** Get all contracts that were instantiated from a code id */
  async contractsByCode(
    request: QueryContractsByCodeRequest,
  ): Promise<QueryContractsByCodeResponse> {
    const response = await this.client.contractsByCode(request);

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
  async queryContract(request: QueryContractRequest): Promise<any> {
    return;
  }

  /** Get WASM bytecode and metadata for a code id */
  async code(codeId: string): Promise<QueryCodeResponse> {
    const response = await this.client.code({ codeId });

    return {
      codeInfo: response.codeInfo
        ? codeInfoResponseFromProtobuf(response.codeInfo)
        : undefined,
      data: response.data,
    };
  }

  async codes(): Promise<CodeInfoResponse[]> {
    const response = await this.client.codes({});

    return response.codeInfos.map((codeInfo) =>
      codeInfoResponseFromProtobuf(codeInfo),
    );
  }
}

export function addressToBytes(address: string): Uint8Array {
  return Uint8Array.from(bech32.decode(address).words);
}

export function bytesToAddress(bytes: Uint8Array): string {
  return bech32.encode("secret", bech32.fromWords(bytes));
}

export function contractInfoFromProtobuf(
  contractInfo: ProtobufContractInfo,
): ContractInfo {
  return {
    codeId: contractInfo.codeId,
    creator: bytesToAddress(contractInfo.creator),
    label: contractInfo.label,
    created: contractInfo.created,
  };
}

export function codeInfoResponseFromProtobuf(
  codeInfo: ProtobufCodeInfoResponse,
): CodeInfoResponse {
  return {
    codeId: codeInfo.codeId,
    creator: bytesToAddress(codeInfo.creator),
    codeHash: toHex(codeInfo.dataHash),
    source: codeInfo.source,
    builder: codeInfo.builder,
  };
}
