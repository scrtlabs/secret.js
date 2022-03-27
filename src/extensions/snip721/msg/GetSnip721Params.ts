export interface Snip721TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  total_supply?: string;
}

export interface GetTokenParamsRequest {
  token_info: {};
}
