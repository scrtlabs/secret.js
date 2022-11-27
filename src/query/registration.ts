import { Empty } from "../grpc_gateway/google/protobuf/empty.pb";
import { Key } from "../grpc_gateway/secret/registration/v1beta1/msg.pb";
import {
  Query,
  QueryEncryptedSeedRequest,
  QueryEncryptedSeedResponse,
} from "../grpc_gateway/secret/registration/v1beta1/query.pb";

export class RegistrationQuerier {
  constructor(private url: string) {}

  txKey(req: Empty, headers?: HeadersInit): Promise<Key> {
    return Query.TxKey(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  registrationKey(req: Empty, headers?: HeadersInit): Promise<Key> {
    return Query.RegistrationKey(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  encryptedSeed(
    req: QueryEncryptedSeedRequest,
    headers?: HeadersInit,
  ): Promise<QueryEncryptedSeedResponse> {
    return Query.EncryptedSeed(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
