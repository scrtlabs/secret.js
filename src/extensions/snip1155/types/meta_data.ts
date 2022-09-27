import { Metadata } from "./misc";

export type Snip1155ChangeMetaDataOptions = {
  token_id: string;
  public_metadata?: Metadata;
  private_metadata?: Metadata;
};
