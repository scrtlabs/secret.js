import { CosmWasmClient } from "secretjs";
import { Permit } from "../permit";
import { Extension } from "./types";

export interface GetNftPrivateMetadataResponse {
    private_metadata: {
        token_uri?: string;
        extension?: Extension;
    };
}

export const GetNftPrivateMetadata = async (
    secretjs: CosmWasmClient,
    token: string,
    address: string,
    token_id: string,
    auth: {
        key?: string;
        permit?: Permit;
    },
): Promise<GetNftPrivateMetadataResponse | undefined> => {
    const { key, permit } = auth;
    let metadataResponse: GetNftPrivateMetadataResponse;

    try {
        if (permit) {
            metadataResponse = await secretjs.queryContractSmart(token, {
                with_permit: {
                    permit,
                    query: {
                        private_metadata: {
                            token_id,
                        },
                    },
                    // limit: 10
                },
            });
        } else {
            metadataResponse = await secretjs.queryContractSmart(token, {
                private_metadata: {
                    token_id,
                    viewer: {
                        address,
                        viewing_key: key,
                    },
                },
            });
        }

        return metadataResponse;
    } catch (e) {
        console.error(`Failed to get private metadata: ${e}`);
        return undefined;
    }
};
