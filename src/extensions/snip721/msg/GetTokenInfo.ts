import { Permit } from "../../access_control";
import { Extension, ViewerInfo } from "../types";

export interface GetTokenInfoRequest {
  all_nft_info: {
    token_id: string;
    viewer?: ViewerInfo;
  };
}

export interface GetTokenInfoRequestWithPermit {
  with_permit: {
    query: {
      all_nft_info: {
        token_id: string;
      };
    };
    permit: Permit;
  };
}

/// token metadata
export interface Metadata {
  /// optional uri for off-chain metadata.  This should be prefixed with `http://`, `https://`, `ipfs://`, or
  /// `ar://`.  Only use this if you are not using `extension`
  token_uri?: string;
  /// optional on-chain metadata.  Only use this if you are not using `token_uri`
  extension?: Extension;
}

export interface Cw721OwnerOfResponse {
  /// Owner of the token if permitted to view it
  owner?: string;
  /// list of addresses approved to transfer this token
  approvals: string[];
}

export interface GetTokenInfoResponse {
  all_nft_info: {
    access: Cw721OwnerOfResponse;
    info?: Metadata;
  };
  token_id: string;
}
