/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type Module = {
  bech32_prefix?: string
  module_account_permissions?: ModuleAccountPermission[]
  authority?: string
}

export type ModuleAccountPermission = {
  account?: string
  permissions?: string[]
}