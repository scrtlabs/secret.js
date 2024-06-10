/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type TableDescriptor = {
  primary_key?: PrimaryKeyDescriptor
  index?: SecondaryIndexDescriptor[]
  id?: number
}

export type PrimaryKeyDescriptor = {
  fields?: string
  auto_increment?: boolean
}

export type SecondaryIndexDescriptor = {
  fields?: string
  id?: number
  unique?: boolean
}

export type SingletonDescriptor = {
  id?: number
}