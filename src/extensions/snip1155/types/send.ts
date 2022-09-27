export type SendAction = {
  token_id: string;
  from: string;
  recipient: string;
  recipient_code_hash?: string;
  amount: string;
  msg?: BinaryData;
  memo?: string;
};

export type Snip1155SendOptions = {
  send: SendAction & { padding?: string };
};

export type Snip1155BatchSendOptions = {
  batch_send: {
    actions: SendAction[];
    padding?: string;
  };
};
