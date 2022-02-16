import { AsyncSender } from "../asyncSender";
import { StdFee } from "secretjs/types/types";
import { ExecuteResult } from "secretjs";
import { GetContractCodeHash } from "../utils";

export const Snip721Send = async (params: {
    secretjs: AsyncSender;
    address: string;
    token_id: string;
    msg: object;
    recipient: string;
    recipient_code_hash: string;
    fee?: StdFee;
}): Promise<ExecuteResult> => {
    const {
        secretjs,
        address,
        token_id,
        msg,
        recipient,
        recipient_code_hash,
        fee,
    } = params;

    const encoded_msg = new Buffer(JSON.stringify(msg)).toString("base64");

    return await secretjs.asyncExecute(
        address,
        {
            send_nft: {
                token_id: token_id,
                contract: recipient,
                receiver_info: { recipient_code_hash },
                msg: encoded_msg,
            },
        },
        "",
        [],
        fee,
    );
};
