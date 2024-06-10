/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type ModuleOptions = {
  tx?: ServiceCommandDescriptor
  query?: ServiceCommandDescriptor
}

export type ServiceCommandDescriptor = {
  service?: string
  rpc_command_options?: RpcCommandOptions[]
  sub_commands?: {[key: string]: ServiceCommandDescriptor}
}

export type RpcCommandOptions = {
  rpc_method?: string
  use?: string
  long?: string
  short?: string
  example?: string
  alias?: string[]
  suggest_for?: string[]
  deprecated?: string
  version?: string
  flag_options?: {[key: string]: FlagOptions}
  positional_args?: PositionalArgDescriptor[]
  skip?: boolean
}

export type FlagOptions = {
  name?: string
  shorthand?: string
  usage?: string
  default_value?: string
  deprecated?: string
  shorthand_deprecated?: string
  hidden?: boolean
}

export type PositionalArgDescriptor = {
  proto_field?: string
  varargs?: boolean
}