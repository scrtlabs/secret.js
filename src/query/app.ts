import {
  Query,
  QueryConfigRequest,
  QueryConfigResponse,
} from "../grpc_gateway/cosmos/app/v1alpha1/query.pb";

export class AppQuerier {
  constructor(private url: string) {}

  config(
    req: QueryConfigRequest,
    headers?: HeadersInit,
  ): Promise<QueryConfigResponse> {
    return Query.Config(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
