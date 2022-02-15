[Secret.js](../README.md) / [Exports](../modules.md) / ComputeQuerier

# Class: ComputeQuerier

## Table of contents

### Constructors

- [constructor](ComputeQuerier.md#constructor)

### Methods

- [code](ComputeQuerier.md#code)
- [codes](ComputeQuerier.md#codes)
- [contractInfo](ComputeQuerier.md#contractinfo)
- [contractsByCode](ComputeQuerier.md#contractsbycode)
- [queryContract](ComputeQuerier.md#querycontract)

## Constructors

### constructor

• **new ComputeQuerier**(`rpc`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rpc` | `Rpc` |

#### Defined in

[query/compute.ts:96](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/compute.ts#L96)

## Methods

### code

▸ **code**(`codeId`): `Promise`<[`QueryCodeResponse`](../modules.md#querycoderesponse)\>

Get WASM bytecode and metadata for a code id

#### Parameters

| Name | Type |
| :------ | :------ |
| `codeId` | `number` |

#### Returns

`Promise`<[`QueryCodeResponse`](../modules.md#querycoderesponse)\>

#### Defined in

[query/compute.ts:177](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/compute.ts#L177)

___

### codes

▸ **codes**(): `Promise`<[`CodeInfoResponse`](../modules.md#codeinforesponse)[]\>

#### Returns

`Promise`<[`CodeInfoResponse`](../modules.md#codeinforesponse)[]\>

#### Defined in

[query/compute.ts:188](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/compute.ts#L188)

___

### contractInfo

▸ **contractInfo**(`__namedParameters`): `Promise`<[`QueryContractInfoResponse`](../modules.md#querycontractinforesponse)\>

Get metadata of a Secret Contract

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`QueryContractInfoRequest`](../modules.md#querycontractinforequest) |

#### Returns

`Promise`<[`QueryContractInfoResponse`](../modules.md#querycontractinforesponse)\>

#### Defined in

[query/compute.ts:117](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/compute.ts#L117)

___

### contractsByCode

▸ **contractsByCode**(`request`): `Promise`<[`QueryContractsByCodeResponse`](../modules.md#querycontractsbycoderesponse)\>

Get all contracts that were instantiated from a code id

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`QueryContractsByCodeRequest`](../modules.md#querycontractsbycoderequest) |

#### Returns

`Promise`<[`QueryContractsByCodeResponse`](../modules.md#querycontractsbycoderesponse)\>

#### Defined in

[query/compute.ts:135](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/compute.ts#L135)

___

### queryContract

▸ **queryContract**(`__namedParameters`): `Promise`<`object`\>

Query a Secret Contract

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`QueryContractRequest`](../modules.md#querycontractrequest) |

#### Returns

`Promise`<`object`\>

#### Defined in

[query/compute.ts:153](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/query/compute.ts#L153)
