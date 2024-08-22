#!/bin/bash
set -o errexit -o nounset -o pipefail

# yarn install
# sudo apt install protobuf-compiler
# go install github.com/scrtlabs/protoc-gen-grpc-gateway-ts@06e2564d87d858c791e9ab6a7759401d2485af27

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

rm -rf "${SCRIPT_PATH}/SecretNetwork"
git clone --depth 1 --branch cosmos-sdk-0.50.x-merged https://github.com/scrtlabs/SecretNetwork "${SCRIPT_PATH}/SecretNetwork"

# plugins paths, note this must be an abolsute path on Windows


SECRET_DIR="${SCRIPT_PATH}/SecretNetwork/proto"
SECRET_THIRD_PARTY_DIR="${SCRIPT_PATH}/SecretNetwork/third_party/proto"

# ts-proto
TS_PROTO_OPTS="esModuleInterop=true,forceLong=string,useOptionals=messages,useDate=false,snakeToCamel=false,useExactTypes=false"

PROTO_OUT_DIR="${SCRIPT_PATH}/../src/protobuf"
rm -rf "$PROTO_OUT_DIR"
mkdir -p "$PROTO_OUT_DIR"

PLUGIN_PATH_TS_PROTO="${SCRIPT_PATH}/../node_modules/.bin/protoc-gen-ts_proto"

protoc \
  --plugin="protoc-gen-ts_proto=${PLUGIN_PATH_TS_PROTO}" \
  --ts_proto_out="${PROTO_OUT_DIR}" \
  --ts_proto_opt="${TS_PROTO_OPTS}" \
  --proto_path="$SECRET_DIR" \
  --proto_path="$SECRET_THIRD_PARTY_DIR" \
  $(find ${SECRET_DIR} ${SECRET_THIRD_PARTY_DIR} -path -prune -o -name '*.proto' -print0 | xargs -0)

find "$PROTO_OUT_DIR" -name '*.ts' | xargs -n 1 perl -i -pe 's/import _m0 from/import * as _m0 from/g'

# grpc-gateway
GRPC_GATEWAY_OPTS="use_proto_names=true"

GRPC_GATEWAY_OUT_DIR="${SCRIPT_PATH}/../src/grpc_gateway"
rm -rf "$GRPC_GATEWAY_OUT_DIR"
mkdir -p "$GRPC_GATEWAY_OUT_DIR"

PLUGIN_PATH_GRPC_GATEWAY="$(which protoc-gen-grpc-gateway-ts)"

protoc \
  --plugin="protoc-gen-grpc_gateway_ts=${PLUGIN_PATH_GRPC_GATEWAY}" \
  --grpc_gateway_ts_out="${GRPC_GATEWAY_OUT_DIR}" \
  --grpc_gateway_ts_opt="${GRPC_GATEWAY_OPTS}" \
  --proto_path="$SECRET_DIR" \
  --proto_path="$SECRET_THIRD_PARTY_DIR" \
  $(find ${SECRET_DIR} ${SECRET_THIRD_PARTY_DIR} -path -prune -o -name '*.proto' -print0 | xargs -0)
