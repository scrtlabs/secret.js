import { InitalTokens } from "./misc";

export type Snip1155CurateTokensOptions = {
  curate_token_ids: {
    initial_tokens: InitalTokens[];
    memo?: string;
    padding?: string;
  };
};
