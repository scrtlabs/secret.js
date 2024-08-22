import {
  Query,
  GetRequest,
  GetResponse,
  ListRequest,
  ListResponse,
} from "../grpc_gateway/cosmos/orm/query/v1alpha1/query.pb";

export class OrmQuerier {
  constructor(private url: string) {}

  get(req: GetRequest, headers?: HeadersInit): Promise<GetResponse> {
    return Query.Get(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  list(req: ListRequest, headers?: HeadersInit): Promise<ListResponse> {
    return Query.List(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
