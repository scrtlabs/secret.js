import { JsonObject } from "@cosmjs/cosmwasm-stargate";
import { fromUtf8, toAscii } from "@cosmjs/encoding";
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import Long from "long";
import {
  QueryClientImpl,
  QueryCodeResponse,
  QueryCodesResponse,
  QueryContractInfoResponse,
  QueryContractsByCodeResponse,
} from "./protobuf_stuff/secret/compute/v1beta1/query";

export interface ComputeExtension {
  readonly compute: {
    /** List all wasm bytecode on the chain */
    readonly listAllCodes: () => Promise<QueryCodesResponse>;
    /** Downloads wasm bytecode for given code id */
    readonly getCodeWasm: (id: number) => Promise<QueryCodeResponse>;
    /** List all wasm bytecode on the chain for given code id */
    readonly listContractsByCode: (
      id: number,
    ) => Promise<QueryContractsByCodeResponse>;
    /** Returns metadata of a contract given its address */
    readonly getContractInfo: (
      address: string,
    ) => Promise<QueryContractInfoResponse>;
    /** Calls contract with given address with query data */
    readonly query: (
      address: string,
      query: Record<string, unknown>,
    ) => Promise<JsonObject>;
  };
}

export function setupComputeExtension(base: QueryClient): ComputeExtension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    compute: {
      listAllCodes: async () => {
        const request = {};
        return queryService.Codes(request);
      },
      getCodeWasm: async (id: number) => {
        const request = { codeId: Long.fromNumber(id) };
        return queryService.Code(request);
      },
      listContractsByCode: async (id: number, paginationKey?: Uint8Array) => {
        const request = {
          codeId: Long.fromNumber(id),
        };
        return queryService.ContractsByCode(request);
      },
      getContractInfo: async (address: string) => {
        const request = { address: toAscii(address) }; // TODO fix
        return queryService.ContractInfo(request);
      },
      query: async (address: string, query: Record<string, unknown>) => {
        const request = {
          address: toAscii(address), // TODO fix
          queryData: toAscii(JSON.stringify(query)), // TODO fix
        };
        const { data } = await queryService.SmartContractState(request);
        try {
          return JSON.parse(fromUtf8(data));
        } catch (error) {
          throw new Error("Contract did not return valid JSON data");
        }
      },
    },
  };
}
