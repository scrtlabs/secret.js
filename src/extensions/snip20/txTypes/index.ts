import { Coin } from "../../../tx";

export interface Tx {
  id: number;
  from: string;
  sender: string;
  receiver: string;
  coins: Coin;
  memo?: string;
  block_time?: number;
  block_height?: number;
}

type TransferType = {
  transfer: {
    from: string;
    sender: string;
    recipient: string;
  };
};

type MintType = {
  mint: {
    minter: string;
    recipient: string;
  };
};

type BurnType = {
  burn: {
    burner: string;
    owner: string;
  };
};

type DepositType = {
  deposit: {};
};

type RedeemType = {
  redeem: {};
};

export type TxAction =
  | RedeemType
  | DepositType
  | MintType
  | BurnType
  | TransferType;

export interface RichTx {
  id: number;
  action: TxAction;
  coins: Coin;
  memo?: string;
  block_time?: number;
  block_height?: number;
}
