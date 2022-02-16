import { CosmWasmClient } from "secretjs";
import { Permit } from "../permit";
import { Extension } from "./types";

/// token metadata
export interface Metadata {
    /// optional uri for off-chain metadata.  This should be prefixed with `http://`, `https://`, `ipfs://`, or
    /// `ar://`.  Only use this if you are not using `extension`
    token_uri?: string;
    /// optional on-chain metadata.  Only use this if you are not using `token_uri`
    extension?: Extension;
}

export interface Cw721OwnerOfResponse {
    /// Owner of the token if permitted to view it
    owner?: string;
    /// list of addresses approved to transfer this token
    approvals: string[];
}

export interface GetTokenInfoResponse {
    all_nft_info: {
        access: Cw721OwnerOfResponse;
        info?: Metadata;
    };
    token_id: string;
}

export const GetTokenInfo = async (
    secretjs: CosmWasmClient,
    token: string,
    address: string,
    token_id: string,
    auth: {
        key?: string;
        permit?: Permit;
    },
): Promise<GetTokenInfoResponse | undefined> => {
    const { key, permit } = auth;
    let balanceResponse: GetTokenInfoResponse;

    try {
        if (permit) {
            balanceResponse = await secretjs.queryContractSmart(token, {
                with_permit: {
                    permit,
                    // viewer: "address_of_the_querier_if_different_from_owner",
                    query: {
                        all_nft_info: {
                            token_id,
                        },
                    },
                    // limit: 10
                },
            });
        } else {
            balanceResponse = await secretjs.queryContractSmart(token, {
                all_nft_info: {
                    token_id,
                },
            });
        }

        console.log(`nft details response: ${JSON.stringify(balanceResponse)}`);

        balanceResponse.token_id = token_id;
        return balanceResponse;
    } catch (e) {
        console.error(`Failed to get details: ${e}`);
        return undefined;
    }
};
