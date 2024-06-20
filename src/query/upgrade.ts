import {
  Query,
  QueryAuthorityRequest,
  QueryAuthorityResponse,
  QueryAppliedPlanRequest,
  QueryAppliedPlanResponse,
  QueryCurrentPlanRequest,
  QueryCurrentPlanResponse,
  QueryModuleVersionsRequest,
  QueryModuleVersionsResponse,
  QueryUpgradedConsensusStateRequest,
  QueryUpgradedConsensusStateResponse,
} from "../grpc_gateway/cosmos/upgrade/v1beta1/query.pb";

export class UpgradeQuerier {
  constructor(private url: string) {}

  authority(
    req: QueryAuthorityRequest,
    headers?: HeadersInit,
  ): Promise<QueryAuthorityResponse> {
    return Query.Authority(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  currentPlan(
    req: QueryCurrentPlanRequest,
    headers?: HeadersInit,
  ): Promise<QueryCurrentPlanResponse> {
    return Query.CurrentPlan(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  appliedPlan(
    req: QueryAppliedPlanRequest,
    headers?: HeadersInit,
  ): Promise<QueryAppliedPlanResponse> {
    return Query.AppliedPlan(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  upgradedConsensusState(
    req: QueryUpgradedConsensusStateRequest,
    headers?: HeadersInit,
  ): Promise<QueryUpgradedConsensusStateResponse> {
    return Query.UpgradedConsensusState(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  moduleVersions(
    req: QueryModuleVersionsRequest,
    headers?: HeadersInit,
  ): Promise<QueryModuleVersionsResponse> {
    return Query.ModuleVersions(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
