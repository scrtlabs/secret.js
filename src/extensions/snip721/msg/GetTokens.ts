import { Permit } from "../../access_control";

interface _TokenList {
  tokens: string[];
}

export interface Snip721GetTokensResponse {
  token_list: _TokenList;
}

export interface Snip721GetTokensRequest {
  tokens: {
    owner: string;
    viewing_key: string;
  };
}

export interface Snip721GetTokensRequestWithPermit {
  with_permit: {
    query: {
      tokens: {
        owner: string;
      };
    };
    permit: Permit;
  };
}
