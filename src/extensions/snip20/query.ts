import { ComputeQuerier } from "../../";
import {
  GetAllowanceRequest,
  GetAllowanceRequestWithPermit,
  GetAllowanceResponse,
  GetBalanceRequest,
  GetBalanceRequestWithPermit,
  GetBalanceResponse,
  GetTokenParamsRequest,
  GetTokenParamsResponse,
  GetTransactionHistoryRequest,
  GetTransactionHistoryRequestWithPermit,
  GetTransferHistoryRequest,
  GetTransferHistoryRequestWithPermit,
  TransactionHistoryResponse,
  TransferHistoryResponse,
} from "./types";
import { ViewingKey, Permit } from "../auth";

interface SecretContract {
  address: string;
  // switch this to optional after we enable automatic code hash
  codeHash: string;
}

export class Snip20Querier extends ComputeQuerier {
  getSnip20Params = async ({
    contract,
  }: {
    contract: SecretContract;
  }): Promise<GetTokenParamsResponse> => {
    return await this.queryContract<
      GetTokenParamsRequest,
      GetTokenParamsResponse
    >({
      address: contract.address,
      codeHash: contract.codeHash,
      query: {
        token_info: {},
      },
    });
  };

  getBalance = async ({
    contract,
    address,
    auth,
  }: {
    contract: SecretContract;
    address: string;
    auth: {
      permit?: Permit;
      key?: ViewingKey;
    };
  }): Promise<GetBalanceResponse> => {
    if (auth.key) {
      return await this.queryContract<GetBalanceRequest, GetBalanceResponse>({
        address: contract.address,
        codeHash: contract.codeHash,
        query: {
          balance: {
            address,
            key: auth.key,
          },
        },
      });
    } else if (auth.permit) {
      return await this.queryContract<
        GetBalanceRequestWithPermit,
        GetBalanceResponse
      >({
        address: contract.address,
        codeHash: contract.codeHash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              balance: {},
            },
          },
        },
      });
    }

    throw new Error("Empty auth parameter for authenticated query: GetBalance");
  };

  getTransferHistory = async ({
    contract,
    address,
    auth,
    page,
    page_size,
  }: {
    contract: SecretContract;
    address: string;
    auth: {
      permit?: Permit;
      key?: ViewingKey;
    };
    page?: number;
    page_size: number;
  }): Promise<TransferHistoryResponse> => {
    if (auth.key) {
      return await this.queryContract<
        GetTransferHistoryRequest,
        TransferHistoryResponse
      >({
        address: contract.address,
        codeHash: contract.codeHash,
        query: {
          transfer_history: {
            address,
            key: auth.key,
            page,
            page_size,
          },
        },
      });
    } else if (auth.permit) {
      return await this.queryContract<
        GetTransferHistoryRequestWithPermit,
        TransferHistoryResponse
      >({
        address: contract.address,
        codeHash: contract.codeHash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              transfer_history: {
                page,
                page_size,
              },
            },
          },
        },
      });
    }

    throw new Error(
      "Empty auth parameter for authenticated query: getTransferHistory",
    );
  };

  getTransactionHistory = async ({
    contract,
    address,
    auth,
    page,
    page_size,
  }: {
    contract: SecretContract;
    address: string;
    auth: {
      permit?: Permit;
      key?: ViewingKey;
    };
    page?: number;
    page_size: number;
  }): Promise<TransactionHistoryResponse> => {
    if (auth.key) {
      return await this.queryContract<
        GetTransactionHistoryRequest,
        TransactionHistoryResponse
      >({
        address: contract.address,
        codeHash: contract.codeHash,
        query: {
          transaction_history: {
            address,
            key: auth.key,
            page,
            page_size,
          },
        },
      });
    } else if (auth.permit) {
      return await this.queryContract<
        GetTransactionHistoryRequestWithPermit,
        TransactionHistoryResponse
      >({
        address: contract.address,
        codeHash: contract.codeHash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              transaction_history: {
                page,
                page_size,
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

  GetAllowance = async ({
    contract,
    owner,
    spender,
    auth,
  }: {
    contract: SecretContract;
    owner: string;
    spender: string;
    auth: {
      permit?: Permit;
      key?: ViewingKey;
    };
  }): Promise<GetAllowanceResponse> => {
    if (auth.key) {
      return await this.queryContract<
        GetAllowanceRequest,
        GetAllowanceResponse
      >({
        address: contract.address,
        codeHash: contract.codeHash,
        query: {
          allowance: {
            owner,
            spender,
            key: auth.key,
          },
        },
      });
    } else if (auth.permit) {
      return await this.queryContract<
        GetAllowanceRequestWithPermit,
        GetAllowanceResponse
      >({
        address: contract.address,
        codeHash: contract.codeHash,
        query: {
          with_permit: {
            permit: auth.permit,
            query: {
              allowance: {
                owner,
                spender,
              },
            },
          },
        },
      });
    }
    throw new Error(
      "Empty auth parameter for authenticated query: GetAllowance",
    );
  };
}
