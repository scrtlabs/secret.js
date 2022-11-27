import {
  Query,
  QueryInterchainAccountFromAddressRequest,
  QueryInterchainAccountFromAddressResponse,
} from "../grpc_gateway/secret/intertx/v1beta1/query.pb";

export class MauthQuerier {
  constructor(private url: string) {}

  interchainAccountFromAddress(
    req: QueryInterchainAccountFromAddressRequest,
    headers?: HeadersInit,
  ): Promise<QueryInterchainAccountFromAddressResponse> {
    return Query.InterchainAccountFromAddress(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
