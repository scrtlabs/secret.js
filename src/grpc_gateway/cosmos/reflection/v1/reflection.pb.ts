/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufDescriptor from "../../../google/protobuf/descriptor.pb"
export type FileDescriptorsRequest = {
}

export type FileDescriptorsResponse = {
  files?: GoogleProtobufDescriptor.FileDescriptorProto[]
}

export class ReflectionService {
  static FileDescriptors(req: FileDescriptorsRequest, initReq?: fm.InitReq): Promise<FileDescriptorsResponse> {
    return fm.fetchReq<FileDescriptorsRequest, FileDescriptorsResponse>(`/cosmos.reflection.v1.ReflectionService/FileDescriptors`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}