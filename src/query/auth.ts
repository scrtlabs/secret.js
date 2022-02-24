// For future wanderers:
// This file is written manually with a few goals in mind:
// 1. Proxy the auto-generated QueryClientImpl from "src/protobuf_stuff/cosmos/auth/v1beta1/query.tx" (See the "scripts/generate_protobuf.sh" script)
// 2. Convert the "account: Any" in the underlying types to the acctual account type

type AccountData = {
  type: "BaseAccount" | "ModuleAccount" | "BaseVestingAccount";
  account:
    | import("../protobuf_stuff/cosmos/auth/v1beta1/auth").BaseAccount
    | import("../protobuf_stuff/cosmos/auth/v1beta1/auth").ModuleAccount
    | import("../protobuf_stuff/cosmos/vesting/v1beta1/vesting").BaseVestingAccount;
};
export type Account = AccountData | null;
export type BaseAccount = {
  address: string;
  accountNumber: string;
  sequence: string;
};
export type ModuleAccount = {
  baseAccount?: BaseAccount;
  name: string;
  permissions: string[];
};

/** AuthQuerier is the query interface for the x/auth module */
export class AuthQuerier {
  private client?: import("../protobuf_stuff/cosmos/auth/v1beta1/query").QueryClientImpl;
  private readonly grpc: import("../protobuf_stuff/secret/compute/v1beta1/query").GrpcWebImpl;

  constructor(
    grpc: import("../protobuf_stuff/secret/compute/v1beta1/query").GrpcWebImpl,
  ) {
    this.grpc = grpc;
  }

  private async init() {
    if (!this.client) {
      this.client = new (
        await import("../protobuf_stuff/cosmos/auth/v1beta1/query")
      ).QueryClientImpl(this.grpc);
    }
  }

  /** returns all the existing accounts */
  async accounts(
    request: import("../protobuf_stuff/cosmos/auth/v1beta1/query").QueryAccountsRequest,
  ): Promise<Account[]> {
    await this.init();

    const response = await this.client!.accounts(request);
    return Promise.all(response.accounts.map((a) => accountFromAny(a)));
  }
  /** returns account details based on address. */
  async account({
    address,
  }: import("../protobuf_stuff/cosmos/auth/v1beta1/query").QueryAccountRequest): Promise<Account> {
    await this.init();

    const response = await this.client!.account({ address });
    return response.account ? accountFromAny(response.account) : null;
  }
  /** queries all parameters. */
  async params(): Promise<
    import("../protobuf_stuff/cosmos/auth/v1beta1/query").QueryParamsResponse
  > {
    await this.init();

    return await this.client!.params({});
  }
}

/**
 * Takes an `Any` encoded account from the chain and converts it into common `Account` types.
 * Adapted from https://github.com/cosmos/cosmjs/blob/17ea689da849aec49055a7985a9780a1c7d581ac/packages/stargate/src/accounts.ts#L38-L84
 */
async function accountFromAny(
  input: import("../protobuf_stuff/google/protobuf/any").Any,
): Promise<Account> {
  const { typeUrl, value } = input;

  switch (typeUrl) {
    // auth
    case "/cosmos.auth.v1beta1.BaseAccount":
      const { BaseAccount } = await import(
        "../protobuf_stuff/cosmos/auth/v1beta1/auth"
      );
      return { type: "BaseAccount", account: BaseAccount.decode(value) };
    case "/cosmos.auth.v1beta1.ModuleAccount":
      const { ModuleAccount } = await import(
        "../protobuf_stuff/cosmos/auth/v1beta1/auth"
      );
      return { type: "ModuleAccount", account: ModuleAccount.decode(value) };

    // vesting
    case "/cosmos.vesting.v1beta1.BaseVestingAccount":
      const { BaseVestingAccount } = await import(
        "../protobuf_stuff/cosmos/vesting/v1beta1/vesting"
      );
      return {
        type: "BaseVestingAccount",
        account: BaseVestingAccount.decode(value),
      };

    default:
      throw new Error(`Unsupported type: '${typeUrl}'`);
  }
}
