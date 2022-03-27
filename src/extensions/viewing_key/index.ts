//createViewingKey
//set_viewing_key

export type ViewingKey = string;

//         createViewingKey({ padding, entropy }: Context) {
//             const handleMsg = {
//                 create_viewing_key: { entropy, padding },
//             };
//             return { handleMsg };
//         },
//
//         setViewingKey({ padding }: Context, key: string) {
//             const handleMsg = {
//                 set_viewing_key: { key, padding },
//             };
//             return { handleMsg };
//         },
