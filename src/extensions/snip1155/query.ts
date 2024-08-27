import { ComputeQuerier } from "../../query";
import { Permit, ViewingKey } from "../access_control";
import {
  QueryAllBalancesResponse,
  QueryAllBalancesWithPermit,
  QueryAllBalancesWithViewingKey,
  QueryBalanceResponse,
  QueryBalanceWithPermit,
  QueryBalanceWithViewingKey,
} from "./msg/getBalance";
import {
  QueryPrivateTokenInfoResponse,
  QueryPrivateTokenInfoWithPermit,
  QueryPrivateTokenInfoWithViewingKey,
} from "./msg/getPrivateTokenInfo";
import {
  QueryTokenIdPublicInfo,
  QueryTokenIdPublicInfoResponse,
} from "./msg/getPublicTokenInfo";
import {
  QueryTransactionHistoryResponse,
  QueryTransactionHistoryWithPermit,
  QueryTransactionHistoryWithViewingKey,
} from "./msg/getTransactionHistory";

interface Auth {
  permit?: Permit;
  viewer?: {
    viewing_key: ViewingKey;
    address: string;
  };
}

interface SecretContract {
  address: string;
  // switch this to optional after we enable automatic code hash
  code_hash?: string;
}

export class Snip1155Querier extends ComputeQuerier {
  getBalance = async ({
    contract,
    token_id,
    owner,
    auth,
  }: {
    contract: SecretContract;
    token_id: string;
    owner: string;
    auth: Auth;
  }): Promise<QueryBalanceResponse> => {
    if (auth.viewer) {
      return await this.queryContract<
        QueryBalanceWithViewingKey,
        QueryBalanceResponse
      >({
        contract_address: contract.address,
        code_hash: contract.code_hash,
        query: {
          balance: {
            token_id,
            owner,
            viewer: auth.viewer.address,
            key: auth.viewer.viewing_key,
          },
        },
      });
    } else if (auth.permit) {
      return await this.queryContract<
        QueryBalanceWithPermit,
        QueryBalanceResponse
      >({
        contract_address: contract.address,
        code_hash: contract.code_hash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              balance: {
                token_id,
                owner,
              },
            },
          },
        },
      });
    }
    throw new Error("Empty auth parameter for authenticated query: GetBalance");
  };

  getAllBalances = async ({
    contract,
    auth,
    owner,
    tx_history_page,
    tx_history_page_size,
  }: {
    contract: SecretContract;
    auth: Auth;
    owner?: string;
    tx_history_page?: number;
    tx_history_page_size?: number;
  }): Promise<QueryAllBalancesResponse> => {
    if (auth.viewer && owner) {
      if (auth.viewer.address !== owner) {
        throw new Error("only owner can query all balances");
      }
      return await this.queryContract<
        QueryAllBalancesWithViewingKey,
        QueryAllBalancesResponse
      >({
        contract_address: contract.address,
        code_hash: contract.code_hash,
        query: {
          all_balances: {
            owner,
            key: auth.viewer.viewing_key,
            tx_history_page,
            tx_history_page_size,
          },
        },
      });
    } else if (auth.permit) {
      return await this.queryContract<
        QueryAllBalancesWithPermit,
        QueryAllBalancesResponse
      >({
        contract_address: contract.address,
        code_hash: contract.code_hash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              all_balances: {
                tx_history_page,
                tx_history_page_size,
              },
            },
          },
        },
      });
    }
    throw new Error(
      "Empty auth parameter for authenticated query: GetAllBalances",
    );
  };

  getTransactionHistory = async ({
    contract,
    auth,
    page_size,
    page,
  }: {
    contract: SecretContract;
    auth: Auth;
    page_size: number;
    page?: number;
  }): Promise<QueryTransactionHistoryResponse> => {
    if (auth.viewer) {
      return this.queryContract<
        QueryTransactionHistoryWithViewingKey,
        QueryTransactionHistoryResponse
      >({
        contract_address: contract.address,
        code_hash: contract.code_hash,
        query: {
          transaction_history: {
            key: auth.viewer.viewing_key,
            address: auth.viewer.address,
            page_size,
            page,
          },
        },
      });
    } else if (auth.permit) {
      return this.queryContract<
        QueryTransactionHistoryWithPermit,
        QueryTransactionHistoryResponse
      >({
        contract_address: contract.address,
        code_hash: contract.code_hash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              transaction_history: {
                page_size,
                page,
              },
            },
          },
        },
      });
    }
    throw new Error(
      "Empty auth parameter for authenticated query: getTransactionHistory",
    );
  };

  getPublicTokenInfo = async ({
    contract,
    token_id,
  }: {
    contract: SecretContract;
    token_id: string;
  }): Promise<QueryTokenIdPublicInfoResponse> => {
    return await this.queryContract<
      QueryTokenIdPublicInfo,
      QueryTokenIdPublicInfoResponse
    >({
      contract_address: contract.address,
      code_hash: contract.code_hash,
      query: {
        token_id_public_info: {
          token_id,
        },
      },
    });
  };

  getPrivateTokenInfo = async ({
    contract,
    token_id,
    auth,
  }: {
    contract: SecretContract;
    token_id: string;
    auth: Auth;
  }): Promise<QueryPrivateTokenInfoResponse> => {
    if (auth.viewer) {
      return await this.queryContract<
        QueryPrivateTokenInfoWithViewingKey,
        QueryPrivateTokenInfoResponse
      >({
        contract_address: contract.address,
        code_hash: contract.code_hash,
        query: {
          token_id_private_info: {
            token_id,
            address: auth.viewer.address,
            key: auth.viewer.viewing_key,
          },
        },
      });
    } else if (auth.permit) {
      return await this.queryContract<
        QueryPrivateTokenInfoWithPermit,
        QueryPrivateTokenInfoResponse
      >({
        contract_address: contract.address,
        code_hash: contract.code_hash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              token_id_private_info: {
                token_id,
              },
            },
          },
        },
      });
    }

    throw new Error(
      "Empty auth parameter for authenticated query: getTransactionHistory",
    );
  };
}
