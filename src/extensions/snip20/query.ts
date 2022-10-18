import { ComputeQuerier } from "../../";
import { Permit, ViewingKey } from "../access_control";
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

interface SecretContract {
  address: string;
  // switch this to optional after we enable automatic code hash
  code_hash: string;
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
      contract_address: contract.address,
      code_hash: contract.code_hash,
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
        contract_address: contract.address,
        code_hash: contract.code_hash,
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
        contract_address: contract.address,
        code_hash: contract.code_hash,
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
        contract_address: contract.address,
        code_hash: contract.code_hash,
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
        contract_address: contract.address,
        code_hash: contract.code_hash,
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
        contract_address: contract.address,
        code_hash: contract.code_hash,
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
        contract_address: contract.address,
        code_hash: contract.code_hash,
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
        contract_address: contract.address,
        code_hash: contract.code_hash,
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
        contract_address: contract.address,
        code_hash: contract.code_hash,
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
