/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum AuthorizationType {
  AUTHORIZATION_TYPE_UNSPECIFIED = "AUTHORIZATION_TYPE_UNSPECIFIED",
  AUTHORIZATION_TYPE_DELEGATE = "AUTHORIZATION_TYPE_DELEGATE",
  AUTHORIZATION_TYPE_UNDELEGATE = "AUTHORIZATION_TYPE_UNDELEGATE",
  AUTHORIZATION_TYPE_REDELEGATE = "AUTHORIZATION_TYPE_REDELEGATE",
}

export type StakeAuthorizationValidators = {
  address?: string[]
}


type BaseStakeAuthorization = {
  max_tokens?: CosmosBaseV1beta1Coin.Coin
  authorization_type?: AuthorizationType
}

export type StakeAuthorization = BaseStakeAuthorization
  & OneOf<{ allow_list: StakeAuthorizationValidators; deny_list: StakeAuthorizationValidators }>