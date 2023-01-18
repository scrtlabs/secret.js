type Expiration = { at_height: number } | { at_time: number } | "never";

type GivePermission = {
  give_permission: {
    allowed_address: string;
    token_id: string;
    view_balance?: boolean;
    view_balance_expiry?: Expiration;
    view_private_metadata?: boolean;
    view_private_metadata_expiry?: Expiration;
    transfer?: string;
    transfer_expiry?: Expiration;
    padding?: string;
  };
};

type RevokePermission = {
  revoke_permission: {
    token_id: string;
    owner: string;
    allowed_address: string;
    padding?: string;
  };
};
