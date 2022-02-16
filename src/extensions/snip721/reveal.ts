import { SigningCosmWasmClient } from "secretjs";

export interface Snip721RevealResponse {
    reveal: { status: "success" | "failure" };
}

export const Snip721Reveal = async (
    secretjs: SigningCosmWasmClient,
    token: string,
    token_id: string,
): Promise<Snip721RevealResponse> => {
    let response;

    response = await secretjs.execute(token, {
        reveal: {
            token_id,
        },
    });

    return response.data;
};
