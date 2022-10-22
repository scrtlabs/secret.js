import { Permit } from "../../access_control";
import { Metadata, Snip1155TokenConfig } from "../types/misc";

export type QueryPrivateTokenInfoWithViewingKey = {
  token_id_private_info: {
    address: string;
    key: string;
    token_id: string;
  };
};
export type QueryPrivateTokenInfoWithPermit = {
  with_permit: {
    permit: Permit;
    query: {
      token_id_private_info: {
        token_id: string;
      };
    };
  };
};

export type QueryPrivateTokenInfoResponse = {
  token_id_private_info: {
    token_id_info: {
      token_id: string;
      name: string;
      symbol: string;
      token_config: Snip1155TokenConfig;
      public_metadata: Metadata;
      private_metadata: Metadata;
      curator: string;
    };
    total_supply?: string;
    owner?: string;
  };
};
