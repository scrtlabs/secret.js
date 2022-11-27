import { ComputeQuerier } from "../../query";
import { Permit, ViewingKey } from "../access_control";
import {
  GetTokenInfoRequest,
  GetTokenInfoRequestWithPermit,
  GetTokenInfoResponse,
} from "./msg/GetTokenInfo";

import {
  Snip721GetTokensRequest,
  Snip721GetTokensRequestWithPermit,
  Snip721GetTokensResponse,
} from "./msg/GetTokens";

interface SecretContract {
  address: string;
  // switch this to optional after we enable automatic code hash
  codeHash: string;
}

interface Auth {
  permit?: Permit;
  viewer?: {
    viewing_key: ViewingKey;
    address: string;
  };
}

export class Snip721Querier extends ComputeQuerier {
  GetTokenInfo = async ({
    contract,
    auth,
    token_id,
  }: {
    contract: SecretContract;
    auth: Auth;
    token_id: string;
  }): Promise<GetTokenInfoResponse> => {
    if (auth.viewer) {
      return await this.queryContract<
        GetTokenInfoRequest,
        GetTokenInfoResponse
      >({
        contract_address: contract.address,
        code_hash: contract.codeHash,
        query: {
          all_nft_info: {
            token_id,
            viewer: auth.viewer,
          },
        },
      });
    } else if (auth.permit) {
      return await this.queryContract<
        GetTokenInfoRequestWithPermit,
        GetTokenInfoResponse
      >({
        contract_address: contract.address,
        code_hash: contract.codeHash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              all_nft_info: {
                token_id,
              },
            },
          },
        },
      });
    }

    throw new Error(
      "Empty auth parameter for authenticated query: GetTokenInfo",
    );
  };

  GetOwnedTokens = async ({
    contract,
    auth,
    owner,
  }: {
    contract: SecretContract;
    auth: Auth;
    owner: string;
  }): Promise<Snip721GetTokensResponse> => {
    if (auth.viewer) {
      return await this.queryContract<
        Snip721GetTokensRequest,
        Snip721GetTokensResponse
      >({
        contract_address: contract.address,
        code_hash: contract.codeHash,
        query: {
          tokens: {
            owner,
            viewing_key: auth.viewer.viewing_key,
          },
        },
      });
    } else if (auth.permit) {
      return await this.queryContract<
        Snip721GetTokensRequestWithPermit,
        Snip721GetTokensResponse
      >({
        contract_address: contract.address,
        code_hash: contract.codeHash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              tokens: {
                owner,
              },
            },
          },
        },
      });
    }

    throw new Error(
      "Empty auth parameter for authenticated query: GetOwnedTokens",
    );
  };
}
