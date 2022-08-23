import { ComputeQuerier } from "../../query";
import { Permit, ViewingKey } from "../access_control";
import {
  GetTokenParamsRequest,
  Snip721TokenInfo,
} from "./msg/GetSnip721Params";
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
  getSnip721Params = async ({
    contract,
  }: {
    contract: SecretContract;
  }): Promise<Snip721TokenInfo> => {
    return await this.queryContract<GetTokenParamsRequest, Snip721TokenInfo>({
      contractAddress: contract.address,
      codeHash: contract.codeHash,
      query: {
        token_info: {},
      },
    });
  };

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
        contractAddress: contract.address,
        codeHash: contract.codeHash,
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
        contractAddress: contract.address,
        codeHash: contract.codeHash,
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
        contractAddress: contract.address,
        codeHash: contract.codeHash,
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
        contractAddress: contract.address,
        codeHash: contract.codeHash,
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
