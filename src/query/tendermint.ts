import {
  GetBlockByHeightRequest,
  GetBlockByHeightResponse,
  GetLatestBlockRequest,
  GetLatestBlockResponse,
  GetLatestValidatorSetRequest,
  GetLatestValidatorSetResponse,
  GetNodeInfoRequest,
  GetNodeInfoResponse,
  GetSyncingRequest,
  GetSyncingResponse,
  GetValidatorSetByHeightRequest,
  GetValidatorSetByHeightResponse,
  Service,
} from "../grpc_gateway/cosmos/base/tendermint/v1beta1/query.pb";

export class TendermintQuerier {
  constructor(private url: string) {}

  getNodeInfo(
    req: GetNodeInfoRequest,
    headers?: HeadersInit,
  ): Promise<GetNodeInfoResponse> {
    return Service.GetNodeInfo(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  getSyncing(
    req: GetSyncingRequest,
    headers?: HeadersInit,
  ): Promise<GetSyncingResponse> {
    return Service.GetSyncing(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  getLatestBlock(
    req: GetLatestBlockRequest,
    headers?: HeadersInit,
  ): Promise<GetLatestBlockResponse> {
    return Service.GetLatestBlock(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  getBlockByHeight(
    req: GetBlockByHeightRequest,
    headers?: HeadersInit,
  ): Promise<GetBlockByHeightResponse> {
    return Service.GetBlockByHeight(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  getLatestValidatorSet(
    req: GetLatestValidatorSetRequest,
    headers?: HeadersInit,
  ): Promise<GetLatestValidatorSetResponse> {
    return Service.GetLatestValidatorSet(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  getValidatorSetByHeight(
    req: GetValidatorSetByHeightRequest,
    headers?: HeadersInit,
  ): Promise<GetValidatorSetByHeightResponse> {
    return Service.GetValidatorSetByHeight(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
