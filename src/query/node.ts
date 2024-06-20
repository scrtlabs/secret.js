import {
  Service,
  ConfigRequest,
  ConfigResponse,
  StatusRequest,
  StatusResponse,
} from "../grpc_gateway/cosmos/base/node/v1beta1/query.pb";

export class NodeQuerier {
  constructor(private url: string) {}

  config(req: ConfigRequest, headers?: HeadersInit): Promise<ConfigResponse> {
    return Service.Config(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  status(req: StatusRequest, headers?: HeadersInit): Promise<StatusResponse> {
    return Service.Status(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
