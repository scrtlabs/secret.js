[Secret.js](../README.md) / [Exports](../modules.md) / AuthQuerier

# Class: AuthQuerier

AuthQuerier is the query interface for the x/auth module

## Table of contents

### Constructors

- [constructor](AuthQuerier.md#constructor)

### Methods

- [account](AuthQuerier.md#account)
- [accounts](AuthQuerier.md#accounts)
- [params](AuthQuerier.md#params)

## Constructors

### constructor

• **new AuthQuerier**(`rpc`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rpc` | `Rpc` |

#### Defined in

[query/auth.ts:38](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/auth.ts#L38)

## Methods

### account

▸ **account**(`__namedParameters`): `Promise`<[`Account`](../modules.md#account)\>

Account returns account details based on address.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `QueryAccountRequest` |

#### Returns

`Promise`<[`Account`](../modules.md#account)\>

#### Defined in

[query/auth.ts:61](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/auth.ts#L61)

___

### accounts

▸ **accounts**(`request`): `Promise`<[`Account`](../modules.md#account)[]\>

Accounts returns all the existing accounts

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `QueryAccountsRequest` |

#### Returns

`Promise`<[`Account`](../modules.md#account)[]\>

#### Defined in

[query/auth.ts:52](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/auth.ts#L52)

___

### params

▸ **params**(): `Promise`<`QueryParamsResponse`\>

Params queries all parameters.

#### Returns

`Promise`<`QueryParamsResponse`\>

#### Defined in

[query/auth.ts:70](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/auth.ts#L70)
