export type NFTTokenConfig = {
  nft: {
    minters: string[];
    public_total_supply: boolean;
    owner_is_public: boolean;
    enable_burn: boolean;
    owner_may_update_metadata: boolean;
    minter_may_update_metadata: boolean;
  };
};

export type FungibleTokenConfig = {
  fungible: {
    minters: string[];
    decimals: number;
    public_total_supply: boolean;
    enable_mint: boolean;
    enable_burn: boolean;
    minter_may_update_metadata: boolean;
  };
};

export type TokenConfig = NFTTokenConfig | FungibleTokenConfig;

export type Metadata = {
  token_uri?: string;
  extension?: any;
};

export type TokenInfo = {
  token_id: string;
  name: string;
  symbol: string;
  token_config: TokenConfig;
  public_metadata?: Metadata;
  private_metadata?: Metadata;
};

export type Balance = {
  address: string;
  amount: string;
};

export type InitalTokens = {
  token_info: TokenInfo[];
  balances: Balance[];
};

export type InitMessage = {
  has_admin: boolean;
  admin?: string;
  curators: string[];
  initial_tokens: InitalTokens[];
  entropy: string;
};
