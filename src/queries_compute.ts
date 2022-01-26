import { JsonObject } from "@cosmjs/cosmwasm-stargate";
import { fromUtf8, toUtf8 } from "@cosmjs/encoding";
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import {
  QueryClientImpl,
  QueryCodeResponse,
  QueryCodesResponse,
  QueryContractInfoResponse,
  QueryContractsByCodeResponse,
} from "./protobuf_stuff/secret/compute/v1beta1/query";
import { bech32 } from "bech32";

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
        return queryService.codes(request);
      },
      getCodeWasm: async (id: number) => {
        const request = { codeId: String(id) };
        return queryService.code(request);
      },
      listContractsByCode: async (id: number) => {
        const request = {
          codeId: String(id),
        };
        return queryService.contractsByCode(request);
      },
      getContractInfo: async (address: string) => {
        const request = { address: addressToBytes(address) };
        return queryService.contractInfo(request);
      },
      query: async (address: string, query: Record<string, unknown>) => {
        const request = {
          address: addressToBytes(address),
          queryData: toUtf8(JSON.stringify(query)), // TODO fix?
        };
        const { data } = await queryService.smartContractState(request);
        try {
          return JSON.parse(fromUtf8(data));
        } catch (error) {
          throw new Error("Contract did not return valid JSON data");
        }
      },
    },
  };
}

function addressToBytes(address: string): Uint8Array {
  return Uint8Array.from(bech32.decode(address).words); // TODO fix?
}
