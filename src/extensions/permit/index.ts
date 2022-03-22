import { StdSignDoc } from "secretjs/types/encoding";
import { Wallet } from "../../wallet_proto";
import { AminoWallet } from "../../wallet_amino";
import { bech32 } from "bech32";
import { base64PubkeyToAddress } from "../../index";
// import { Keplr } from "@keplr-wallet/types";

class PermitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PermitError";
  }
}

class ContractNotInPermit extends PermitError {
  contract: string;
  allowed_contracts: string[];

  constructor(contract: string, allowed_contracts: string[]) {
    super("No contract in : " + contract);
    this.name = "ContractNotInPermit";
    this.contract = contract;
    this.allowed_contracts = allowed_contracts;
  }
}

class SignatureInvalid extends PermitError {
  signature: string;
  key: string;

  constructor(signature: string, key: string) {
    super("Signature invalid in permit");
    this.name = "SignatureInvalid";
    this.key = key;
    this.signature = signature;
  }
}

class SignerIsNotAddress extends PermitError {
  signature: string;
  address: string;

  constructor(signature: string, address: string) {
    super("Address is not signer");
    this.name = "SignerIsNotAddress";
    this.address = address;
    this.signature = signature;
  }
}

class PermissionNotInPermit extends PermitError {
  permission: Permission[];
  permissionsInContract: Permission[];

  constructor(permission: Permission[], permissionsInContract: Permission[]) {
    super("Address is not signer");
    this.name = "PermissionNotInPermit";
    this.permission = permission;
    this.permissionsInContract = permissionsInContract;
  }
}

export type Permission = "owner" | "history" | "balance" | "Allowance";

export interface StdSignature {
  readonly pub_key: PubKey;
  readonly signature: string;
}

export interface PubKey {
  readonly type: string;
  readonly value: string;
}

export interface Permit {
  params: {
    permit_name: string;
    allowed_tokens: string[];
    chain_id: string;
    permissions: Permission[];
  };
  signature: StdSignature;
}

export const newSignDoc = (
  chainId: string,
  permit_name: string,
  allowed_tokens: string[],
  permissions: Permission[],
): StdSignDoc => {
  return {
    chain_id: chainId,
    account_number: "0", // Must be 0
    sequence: "0", // Must be 0
    fee: {
      amount: [{ denom: "uscrt", amount: "0" }], // Must be 0 uscrt
      gas: "1", // Must be 1
    },
    msgs: [
      {
        type: "query_permit", // Must be "query_permit"
        value: {
          permit_name,
          allowed_tokens,
          permissions,
        },
      },
    ],
    memo: "", // Must be empty
  };
};
//
export const newPermit = async (
  signer: AminoWallet,
  owner: string,
  chainId: string,
  permitName: string,
  allowedTokens: string[],
  permissions: Permission[],
): Promise<Permit> => {
  const { signature } = await signer.signAmino(owner, {
    chain_id: chainId,
    account_number: "0", // Must be 0
    sequence: "0", // Must be 0
    fee: {
      amount: [{ denom: "uscrt", amount: "0" }], // Must be 0 uscrt
      gas: "1", // Must be 1
    },
    msgs: [
      {
        type: "query_permit", // Must be "query_permit"
        value: {
          permit_name: permitName,
          allowed_tokens: allowedTokens,
          permissions,
        },
      },
    ],
    memo: "", // Must be empty
  });

  return {
    params: {
      chain_id: chainId,
      permit_name: permitName,
      allowed_tokens: allowedTokens,
      permissions,
    },
    signature: signature,
  };
};

export const validatePermit = (
  permit: Permit,
  address: string,
  contract: string,
  permissions: Permission[],
): boolean => {
  // check if contract is valid
  let contractInPermit = permit.params.allowed_tokens.includes(contract);

  if (!contractInPermit) {
    throw new ContractNotInPermit(contract, permit.params.allowed_tokens);
  }

  let permissionInPermit = permit.params.permissions.find((p) =>
    permissions.includes(p),
  );

  if (!permissionInPermit) {
    throw new PermissionNotInPermit(permissions, permit.params.permissions);
  }

  let hrp = "";
  try {
    hrp = bech32.decode(address).prefix;
  } catch {
    throw new Error(
      `Address address=${address} must be a valid bech32 address`,
    );
  }

  const permitAcc = base64PubkeyToAddress(
    permit.signature.pub_key.value,
    "secret",
  );

  return true;
};
