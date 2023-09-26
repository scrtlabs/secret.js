// For future wanderers:
// This file is written manually with a few goals in mind:
// 1. Proxy the auto-generated QueryClientImpl from "src/protobuf/secret/compute/v1beta1/query.tx" (See the "scripts/generate_protobuf.sh" script)
// 2. Abstract "address: Uint8Array" in the underlying types as "address: string".
// 3. Add Secret Network encryption

import { fromBase64, fromUtf8 } from "@cosmjs/encoding";
import { getMissingCodeHashWarning } from "..";
import { EncryptionUtils, EncryptionUtilsImpl } from "../encryption";
import { Empty } from "../grpc_gateway/google/protobuf/empty.pb";
import {
  Query,
  QueryByCodeIdRequest,
  QueryByContractAddressRequest,
  QueryByLabelRequest,
  QueryCodeHashResponse,
  QueryCodeResponse,
  QueryCodesResponse,
  QueryContractAddressResponse,
  QueryContractHistoryRequest,
  QueryContractInfoResponse,
  QueryContractLabelResponse,
  QueryContractsByCodeIdResponse,
} from "../grpc_gateway/secret/compute/v1beta1/query.pb";
import {
  AbsoluteTxPosition,
  ContractCodeHistoryOperationType,
} from "../grpc_gateway/secret/compute/v1beta1/types.pb";

export type QueryContractRequest<T> = {
  /** The address of the contract */
  contract_address: string;
  /** The SHA256 hash value of the contract's WASM bytecode, represented as case-insensitive 64
   * character hex string.
   * This is used to make sure only the contract that's being invoked can decrypt the query data.
   *
   * code_hash is an optional parameter but using it will result in way faster execution time.
   *
   * Valid examples:
   * - "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "0xaf74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "AF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   * - "0xAF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   */
  code_hash?: string;
  /** A JSON object that will be passed to the contract as a query */
  query: T;
};

export type ContractCodeHistoryEntry = {
  operation: ContractCodeHistoryOperationType;
  code_id: string;
  updated: AbsoluteTxPosition;
  msg: string;
};

export class ComputeQuerier {
  private codeHashCache = new Map<string | number, string>();

  constructor(private url: string, private encryption?: EncryptionUtils) {
    if (!this.encryption) {
      this.encryption = new EncryptionUtilsImpl(url);
    }
  }

  contractInfo(
    req: QueryByContractAddressRequest,
    headers?: HeadersInit,
  ): Promise<QueryContractInfoResponse> {
    return Query.ContractInfo(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  contractsByCodeId(
    req: QueryByCodeIdRequest,
    headers?: HeadersInit,
  ): Promise<QueryContractsByCodeIdResponse> {
    return Query.ContractsByCodeId(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  code(
    req: QueryByCodeIdRequest,
    headers?: HeadersInit,
  ): Promise<QueryCodeResponse> {
    return Query.Code(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  codes(req: Empty, headers?: HeadersInit): Promise<QueryCodesResponse> {
    return Query.Codes(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  async codeHashByContractAddress(
    req: QueryByContractAddressRequest,
    headers?: HeadersInit,
  ): Promise<QueryCodeHashResponse> {
    let code_hash = this.codeHashCache.get(req.contract_address!);

    if (!code_hash) {
      ({ code_hash } = await Query.CodeHashByContractAddress(req, {
        headers,
        pathPrefix: this.url,
      }));

      this.codeHashCache.set(req.contract_address!, code_hash!);
    }

    return { code_hash };
  }

  async codeHashByCodeId(
    req: QueryByCodeIdRequest,
    headers?: HeadersInit,
  ): Promise<QueryCodeHashResponse> {
    let code_hash = this.codeHashCache.get(req.code_id!);

    if (!code_hash) {
      ({ code_hash } = await Query.CodeHashByCodeId(
        { code_id: req.code_id },
        {
          headers,
          pathPrefix: this.url,
        },
      ));

      this.codeHashCache.set(req.code_id!, code_hash!);
    }

    return { code_hash };
  }

  labelByAddress(
    req: QueryByContractAddressRequest,
    headers?: HeadersInit,
  ): Promise<QueryContractLabelResponse> {
    return Query.LabelByAddress(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  addressByLabel(
    req: QueryByLabelRequest,
    headers?: HeadersInit,
  ): Promise<QueryContractAddressResponse> {
    return Query.AddressByLabel(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  /**
   * Query a Secret Contract.
   * May return a string on error.
   */
  async queryContract<T extends object, R extends any>(
    {
      contract_address: contractAddress,
      code_hash: codeHash,
      query,
    }: QueryContractRequest<T>,
    headers?: HeadersInit,
  ): Promise<R> {
    if (!codeHash) {
      console.warn(getMissingCodeHashWarning("queryContract()"));
      ({ code_hash: codeHash } = await this.codeHashByContractAddress({
        contract_address: contractAddress,
      }));
    }
    codeHash = codeHash!.replace("0x", "").toLowerCase();

    const encryptedQuery = await this.encryption!.encrypt(codeHash, query);
    const nonce = encryptedQuery.slice(0, 32);

    try {
      const { data: encryptedResult } = await Query.QuerySecretContract(
        {
          contract_address: contractAddress,
          query: encryptedQuery,
        },
        {
          headers,
          pathPrefix: this.url,
        },
      );

      const decryptedBase64Result = await this.encryption!.decrypt(
        fromBase64(encryptedResult as unknown as string)!,
        nonce,
      );

      // Don't try to parse JSON in case the result is empty.
      // This seems kinda stupid but if the contract for some reason returns `Binary::default()`
      // the JSON parsing will fail (empty bytes)
      if (!decryptedBase64Result?.length) {
        return {} as R;
      }

      return JSON.parse(fromUtf8(fromBase64(fromUtf8(decryptedBase64Result))));
    } catch (err) {
      try {
        const errorMessageRgx =
          /encrypted: (.+?): (?:instantiate|execute|query|reply to|migrate) contract failed/g;
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
          //@ts-ignore
          // return the error string
          return fromUtf8(fromBase64(fromUtf8(decryptedBase64Error)));
        } catch (parseError) {
          if (parseError.message === "Invalid base64 string format") {
            //@ts-ignore
            // return the error string
            return fromUtf8(decryptedBase64Error);
          } else {
            throw err;
          }
        }
      } catch (decryptionError) {
        throw err;
      }
    }
  }

  async contractHistory(
    req: QueryContractHistoryRequest,
    headers?: HeadersInit,
  ): Promise<{ entries: ContractCodeHistoryEntry[] }> {
    const { entries } = await Query.ContractHistory(req, {
      headers,
      pathPrefix: this.url,
    });

    let decryptedEntries: ContractCodeHistoryEntry[] = [];
    for (const entry of entries ?? []) {
      let msg = entry.msg as unknown as string;
      try {
        const encryptedInput = fromBase64(msg);
        const nonce = encryptedInput.slice(0, 32);
        const encryptedInitMsg = encryptedInput.slice(64);

        const plaintextInitMsg = await this.encryption!.decrypt(
          encryptedInitMsg,
          nonce,
        );
        msg = fromUtf8(plaintextInitMsg).slice(64);
      } catch (err) {}

      decryptedEntries.push({
        operation: entry.operation!,
        code_id: entry.code_id!,
        updated: entry.updated!,
        msg,
      });
    }

    return { entries: decryptedEntries };
  }
}
