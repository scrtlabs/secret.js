import { Permit } from "../../access_control";

export type QueryBalanceWithViewingKey = {
  balance: {
    owner: string;
    viewer: string;
    key: string;
    token_id: string;
  };
};

export type QueryBalanceWithPermit = {
  with_permit: {
    permit: Permit;
    query: {
      balance: {
        owner: string;
        token_id: string;
      };
    };
  };
};

export type QueryBalanceResponse = {
  balance: {
    amount: string;
  };
};

export type QueryAllBalancesWithViewingKey = {
  all_balances: {
    owner: string;
    key: string;
    tx_history_page?: number;
    tx_history_page_size?: number;
  };
};

export type QueryAllBalancesWithPermit = {
  with_permit: {
    permit: Permit;
    query: {
      all_balances: {
        tx_history_page?: number;
        tx_history_page_size?: number;
      };
    };
  };
};

export type QueryAllBalancesResponse = {
  all_balances: [
    {
      token_id: string;
      amount: string;
    },
  ];
};
