import {
    Query,
    QueryChecksumsRequest,
    QueryChecksumsResponse,
    QueryCodeRequest,
    QueryCodeResponse,
} from "../grpc_gateway/ibc/lightclients/wasm/v1/query.pb";

export class IbcWasmQuerier {
    constructor(private url: string) {}
 
    checksums(
        req: QueryChecksumsRequest,
        headers?: HeadersInit,
      ): Promise<QueryChecksumsResponse> {
        return Query.Checksums(req, {
          headers,
          pathPrefix: this.url,
        });
      }

      code(
        req: QueryCodeRequest,
        headers?: HeadersInit,
      ): Promise<QueryCodeResponse> {
        return Query.Code(req, {
          headers,
          pathPrefix: this.url,
        });
      }

}