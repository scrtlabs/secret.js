import {
  Query,
  ParamsRequest,
  ParamsResponse,
} from "../grpc_gateway/secret/emergencybutton/v1beta1/query.pb";

export class EmergencyButtonQuerier {
  constructor(private url: string) {}

  params(
    req: ParamsRequest,
    headers?: HeadersInit,
  ): Promise<ParamsResponse> {
    return Query.Params(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
