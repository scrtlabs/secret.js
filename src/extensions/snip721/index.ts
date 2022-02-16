import { GetTokenInfo, GetTokenInfoResponse } from "./GetTokenInfo";
import { GetSnip721Params, Snip721TokenInfo } from "./GetSnip721Params";
import {
    Snip721GetTokens as GetTokens,
    Snip721GetTokensResponse as GetTokensResponse,
} from "./GetTokens";
import { Snip721Send as Send } from "./send";
import { Snip721Reveal } from "./reveal";
import {
    GetNftPrivateMetadata,
    GetNftPrivateMetadataResponse,
} from "./GetNftPrivateMetadata";

const Snip721 = {
    GetTokenInfo,
    GetSnip721Params,
    GetTokens,
    Send,
    Snip721Reveal,
    GetNftPrivateMetadata,
};

export type Snip721TokenParams = Snip721TokenInfo;
export type Snip721TokenDetails = GetTokenInfoResponse;
export type Snip721GetTokensResponse = GetTokensResponse;
export type Snip721GetPrivateMetadata = GetNftPrivateMetadataResponse;

export default Snip721;
