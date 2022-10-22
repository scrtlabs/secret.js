import { Snip1155InitalToken } from "./misc";

export type Snip1155CurateTokensOptions = {
  curate_token_ids: {
    initial_tokens: Snip1155InitalToken[];
    memo?: string;
    padding?: string;
  };
};
