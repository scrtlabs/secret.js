## Amino types and how they're represented in JSON

| Amino  | JSON    | Note                                        | Source                                                                                                 |
| ------ | ------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| string | string  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L142-L143) |
| bool   | boolean |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L142-L143) |
| int    | string  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L116-L121) |
| int64  | string  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L116-L121) |
| uint   | string  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L116-L121) |
| uint64 | string  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L116-L121) |
| int8   | number  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132) |
| int16  | number  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132) |
| int32  | number  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132) |
| uint8  | number  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132) |
| uint16 | number  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132) |
| uint32 | number  |                                             | [tendermint/go-amino](https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132) |
| Dec    | string  | Must have 18 digits after the decimal point |                                                                                                        |
| Int    | string  |                                             |                                                                                                        |
