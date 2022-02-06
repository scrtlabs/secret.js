## Amino types and how they're represented in JSON

| Amino  | JSON    | Source                                                                          |
| ------ | ------- | ------------------------------------------------------------------------------- |
| string | string  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L142-L143 |
| bool   | boolean | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L142-L143 |
| int    | string  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L116-L121 |
| int64  | string  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L116-L121 |
| uint   | string  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L116-L121 |
| uint64 | string  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L116-L121 |
| int8   | number  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132 |
| int16  | number  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132 |
| int32  | number  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132 |
| uint8  | number  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132 |
| uint16 | number  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132 |
| uint32 | number  | https://github.com/tendermint/go-amino/blob/8e779b71f4/json-decode.go#L130-L132 |
