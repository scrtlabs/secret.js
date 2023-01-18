export type Snip1155AddMinterOptions = {
  add_minters: {
    token_id: string;
    add_minters: string[];
    padding?: string;
  };
};

export type Snip1155RemoveMinterOptions = {
  remove_minters: {
    token_id: string;
    remove_minters: string[];
    padding?: string;
  };
};
