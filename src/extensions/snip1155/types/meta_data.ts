import { Metadata } from "./misc";

export type Snip1155ChangeMetaDataOptions = {
  change_metadata: {
    token_id: string;
    public_metadata?: Metadata;
    private_metadata?: Metadata;
  };
};
