import { CosmWasmClient } from "secretjs";

export interface Snip721TokenInfo {
    name: string;
    symbol: string;
    decimals: number;
    total_supply?: string;
}

export const GetSnip721Params = async (params: {
    secretjs: CosmWasmClient;
    address: string;
}): Promise<Snip721TokenInfo> => {
    const { secretjs, address } = params;

    try {
        const paramsResponse = await secretjs.queryContractSmart(address, {
            token_info: {},
        });

        return {
            name: paramsResponse.token_info.name,
            symbol: paramsResponse.token_info.symbol,
            decimals: paramsResponse.token_info.decimals,
            total_supply: paramsResponse.token_info?.total_supply,
        };
    } catch (e) {
        throw Error("Failed to get info");
    }
};
