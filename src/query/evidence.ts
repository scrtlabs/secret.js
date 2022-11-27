import {
  Query,
  QueryAllEvidenceRequest,
  QueryAllEvidenceResponse,
  QueryEvidenceRequest,
  QueryEvidenceResponse,
} from "../grpc_gateway/cosmos/evidence/v1beta1/query.pb";

export class EvidenceQuerier {
  constructor(private url: string) {}

  evidence(
    req: QueryEvidenceRequest,
    headers?: HeadersInit,
  ): Promise<QueryEvidenceResponse> {
    return Query.Evidence(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  allEvidence(
    req: QueryAllEvidenceRequest,
    headers?: HeadersInit,
  ): Promise<QueryAllEvidenceResponse> {
    return Query.AllEvidence(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
