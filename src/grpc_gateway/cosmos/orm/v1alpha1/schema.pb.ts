/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum StorageType {
  STORAGE_TYPE_DEFAULT_UNSPECIFIED = "STORAGE_TYPE_DEFAULT_UNSPECIFIED",
  STORAGE_TYPE_MEMORY = "STORAGE_TYPE_MEMORY",
  STORAGE_TYPE_TRANSIENT = "STORAGE_TYPE_TRANSIENT",
}

export type ModuleSchemaDescriptorFileEntry = {
  id?: number
  proto_file_name?: string
  storage_type?: StorageType
}

export type ModuleSchemaDescriptor = {
  schema_file?: ModuleSchemaDescriptorFileEntry[]
  prefix?: Uint8Array
}