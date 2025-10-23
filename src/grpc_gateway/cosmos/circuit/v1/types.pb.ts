/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum PermissionsLevel {
  LEVEL_NONE_UNSPECIFIED = "LEVEL_NONE_UNSPECIFIED",
  LEVEL_SOME_MSGS = "LEVEL_SOME_MSGS",
  LEVEL_ALL_MSGS = "LEVEL_ALL_MSGS",
  LEVEL_SUPER_ADMIN = "LEVEL_SUPER_ADMIN",
}

export type Permissions = {
  level?: PermissionsLevel
  limit_type_urls?: string[]
}

export type GenesisAccountPermissions = {
  address?: string
  permissions?: Permissions
}

export type GenesisState = {
  account_permissions?: GenesisAccountPermissions[]
  disabled_type_urls?: string[]
}