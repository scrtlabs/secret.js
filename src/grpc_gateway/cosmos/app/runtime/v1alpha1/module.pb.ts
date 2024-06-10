/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type Module = {
  app_name?: string
  begin_blockers?: string[]
  end_blockers?: string[]
  init_genesis?: string[]
  export_genesis?: string[]
  override_store_keys?: StoreKeyConfig[]
  order_migrations?: string[]
  precommiters?: string[]
  prepare_check_staters?: string[]
}

export type StoreKeyConfig = {
  module_name?: string
  kv_store_key?: string
}