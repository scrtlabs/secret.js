// For future wanderers:
// This file is written manually with a few goals in mind:
// 1. Proxy the auto-generated QueryClientImpl from "src/protobuf_stuff/cosmos/auth/v1beta1/query.tx" (See the "scripts/generate_protobuf.sh" script)
// 2. Convert the "account: Any" in the underlying types to the acctual account type

import {
  BaseAccount,
  ModuleAccount,
} from "../protobuf_stuff/cosmos/auth/v1beta1/auth";
import {
  QueryAccountRequest,
  QueryAccountsRequest,
  QueryClientImpl,
  QueryParamsResponse,
} from "../protobuf_stuff/cosmos/auth/v1beta1/query";
import { BaseVestingAccount } from "../protobuf_stuff/cosmos/vesting/v1beta1/vesting";
import { Any } from "../protobuf_stuff/google/protobuf/any";

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

type AccountData = {
  type: "BaseAccount" | "ModuleAccount" | "BaseVestingAccount";
  account: BaseAccount | ModuleAccount | BaseVestingAccount;
};
type Account = AccountData | null;
export { Account, BaseAccount, ModuleAccount, BaseVestingAccount };

/** AuthQuerier is the query interface for the x/auth module */
export class AuthQuerier /* implements Query */ {
  private readonly baseQuerier: QueryClientImpl;
  constructor(rpc: Rpc) {
    this.baseQuerier = new QueryClientImpl(rpc);
  }
  /** Accounts returns all the existing accounts */
  async accounts(request: QueryAccountsRequest): Promise<Account[]> {
    const response = await this.baseQuerier.accounts(request);
    return response.accounts.map((a) => accountFromAny(a));
  }
  /** Account returns account details based on address. */
  async account({ address }: QueryAccountRequest): Promise<Account> {
    const response = await this.baseQuerier.account({ address });
    return response.account ? accountFromAny(response.account) : null;
  }
  /** Params queries all parameters. */
  params(): Promise<QueryParamsResponse> {
    return this.baseQuerier.params({});
  }
}

/**
 * Takes an `Any` encoded account from the chain and converts it into common `Account` types.
 * Adapted from https://github.com/cosmos/cosmjs/blob/17ea689da849aec49055a7985a9780a1c7d581ac/packages/stargate/src/accounts.ts#L38-L84
 */
function accountFromAny(input: Any): Account {
  const { typeUrl, value } = input;

  switch (typeUrl) {
    // auth
    case "/cosmos.auth.v1beta1.BaseAccount":
      return { type: "BaseAccount", account: BaseAccount.decode(value) };
    case "/cosmos.auth.v1beta1.ModuleAccount": {
      return { type: "ModuleAccount", account: ModuleAccount.decode(value) };
    }

    // vesting
    case "/cosmos.vesting.v1beta1.BaseVestingAccount": {
      return {
        type: "BaseVestingAccount",
        account: BaseVestingAccount.decode(value),
      };
    }

    default:
      throw new Error(`Unsupported type: '${typeUrl}'`);
  }
}
