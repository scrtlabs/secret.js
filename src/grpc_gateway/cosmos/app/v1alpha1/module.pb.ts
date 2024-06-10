/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type ModuleDescriptor = {
  go_import?: string
  use_package?: PackageReference[]
  can_migrate_from?: MigrateFromInfo[]
}

export type PackageReference = {
  name?: string
  revision?: number
}

export type MigrateFromInfo = {
  module?: string
}