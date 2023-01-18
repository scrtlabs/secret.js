import { fromBase64 } from "@cosmjs/encoding";
import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";
import { bech32 } from "bech32";
import { base64PubkeyToAddress, stringToCoins } from "../../../index";
import {
  AminoSigner,
  serializeStdSignDoc,
  StdSignDoc,
} from "../../../wallet_amino";

export class PermitError extends Error {
  readonly type = "PermitError";
  constructor(message: string) {
    super(message);
    this.name = "PermitError";
  }
}

export class ContractNotInPermit extends PermitError {
  contract: string;
  allowed_contracts: string[];

  constructor(contract: string, allowed_contracts: string[]) {
    super(`Contract ${contract} is not allowed for this permit`);
    this.name = "ContractNotInPermit";
    this.contract = contract;
    this.allowed_contracts = allowed_contracts;
  }
}

export class SignatureInvalid extends PermitError {
  signature: string;
  key: string;

  constructor(signature: string, key: string) {
    super(`Signature invalid`);
    this.name = "SignatureInvalid";
    this.key = key;
    this.signature = signature;
  }
}

export class SignerIsNotAddress extends PermitError {
  publicKey: PubKey;
  address: string;

  constructor(publicKey: PubKey, address: string) {
    super(`Address ${address} is not the permit signer`);
    this.name = "SignerIsNotAddress";
    this.address = address;
    this.publicKey = publicKey;
  }
}

export class PermissionNotInPermit extends PermitError {
  permission: Permission[];
  permissionsInContract: Permission[];

  constructor(permission: Permission[], permissionsInContract: Permission[]) {
    super("Permit does not contain required the permissions");
    this.name = "PermissionNotInPermit";
    this.permission = permission;
    this.permissionsInContract = permissionsInContract;
  }
}

export type Permission = "owner" | "history" | "balance" | "allowance";

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
      amount: stringToCoins("0uscrt"), // Must be 0 uscrt
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
  signer: AminoSigner,
  owner: string,
  chainId: string,
  permitName: string,
  allowedTokens: string[],
  permissions: Permission[],
  keplr: boolean,
): Promise<Permit> => {
  let signature;
  if (!keplr) {
    signature = (
      await signer.signAmino(
        owner,
        newSignDoc(chainId, permitName, allowedTokens, permissions),
      )
    ).signature;
  }
  //@ts-ignore
  else if (!window?.keplr) {
    throw new Error(
      "Cannot sign with Keplr - extension not enabled; enable Keplr or change signing mode",
    );
  } else {
    //@ts-ignore
    ({ signature } = await window.keplr.signAmino(
      chainId,
      owner,
      {
        chain_id: chainId,
        account_number: "0", // Must be 0
        sequence: "0", // Must be 0
        fee: {
          amount: stringToCoins("0uscrt"), // Must be 0 uscrt
          gas: "1", // Must be 1
        },
        msgs: [
          {
            type: "query_permit", // Must be "query_permit"
            value: {
              permit_name: permitName,
              allowed_tokens: allowedTokens,
              permissions: permissions,
            },
          },
        ],
        memo: "", // Must be empty
      },
      {
        preferNoSetFee: true, // Fee must be 0, so hide it from the user
        preferNoSetMemo: true, // Memo must be empty, so hide it from the user
      },
    ));
  }

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
  exceptions: boolean = true,
): boolean => {
  // check if contract is valid
  let contractInPermit = permit.params.allowed_tokens.includes(contract);

  if (!contractInPermit) {
    if (!exceptions) {
      return false;
    }
    throw new ContractNotInPermit(contract, permit.params.allowed_tokens);
  }

  let permissionInPermit = permit.params.permissions.find((p) =>
    permissions.includes(p),
  );

  if (!permissionInPermit) {
    if (!exceptions) {
      return false;
    }
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

  let permitAcc = "";
  try {
    permitAcc = base64PubkeyToAddress(permit.signature.pub_key.value, hrp);
  } catch (e) {
    throw new PermitError("Pubkey invalid");
  }

  if (permitAcc !== address) {
    if (!exceptions) {
      return false;
    }
    throw new SignerIsNotAddress(permit.signature.pub_key, address);
  }

  let sigIsValid = false;
  try {
    sigIsValid = _validate_sig(permit);
  } catch (e) {
    if (!exceptions) {
      return false;
    }
    // validation can fail if signature is malformed
    throw new SignatureInvalid(
      permit.signature.signature,
      permit.signature.pub_key.value,
    );
  }

  if (!sigIsValid) {
    if (!exceptions) {
      return false;
    }
    throw new SignatureInvalid(
      permit.signature.signature,
      permit.signature.pub_key.value,
    );
  }

  return true;
};

const _validate_sig = (permit: Permit): boolean => {
  let signDoc = newSignDoc(
    permit.params.chain_id,
    permit.params.permit_name,
    permit.params.allowed_tokens,
    permit.params.permissions,
  );
  const messageHash = sha256(serializeStdSignDoc(signDoc));
  let sig = secp256k1.Signature.fromCompact(
    fromBase64(permit.signature.signature),
  );

  return secp256k1.verify(
    sig,
    messageHash,
    fromBase64(permit.signature.pub_key.value),
  );
};
