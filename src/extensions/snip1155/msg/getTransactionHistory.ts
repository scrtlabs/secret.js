import { Permit } from "../../access_control";

export type QueryTransactionHistoryWithViewingKey = {
  transaction_history: {
    address: string;
    key: string;
    page?: number;
    page_size: number;
  };
};

export type QueryTransactionHistoryWithPermit = {
  with_permit: {
    permit: Permit;
    query: {
      transaction_history: {
        page?: number;
        page_size: number;
      };
    };
  };
};

type MintAction = {
  mint: {
    minter: string;
    recipient: string;
    amount: string;
  };
};

type BurnAction = {
  burn: {
    burner?: string;
    owner: string;
    amount: string;
  };
};

type TransferAction = {
  transfer: {
    from: string;
    sender?: string;
    recipient: string;
    amount: string;
  };
};

export type Snip1155TxAction = MintAction | BurnAction | TransferAction;

export type QueryTransactionHistoryResponse = {
  transaction_history: {
    txs: [
      {
        tx_id: number;
        block_height: number;
        block_time: number;
        token_id: string;
        action: Snip1155TxAction;
        memo?: string;
      },
    ];
    total: number;
  };
};
