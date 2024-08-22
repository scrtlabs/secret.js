import {
  Query,
  AppOptionsRequest,
  AppOptionsResponse,
} from "../grpc_gateway/cosmos/autocli/v1/query.pb";

export class AutoCliQuerier {
  constructor(private url: string) {}

  appOptions(
    req: AppOptionsRequest,
    headers?: HeadersInit,
  ): Promise<AppOptionsResponse> {
    return Query.AppOptions(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
