export type Snip1155ChangeAdminOptions = {
  change_admin: {
    new_admin: string;
    padding?: string;
  };
};

export type Snip1155RemoveAdminOptions = {
  remove_admin: {
    current_admin: string;
    contract_address: string;
    padding?: string;
  };
};
