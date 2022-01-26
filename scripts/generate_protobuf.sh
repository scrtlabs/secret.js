#!/bin/bash
set -o errexit -o nounset -o pipefail

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

OUT_DIR="${SCRIPT_PATH}/../src/protobuf_stuff"
mkdir -p "$OUT_DIR"

PLUGIN_PATH="${SCRIPT_PATH}/../node_modules/.bin/protoc-gen-ts_proto"
TS_PROTO_OPTS="esModuleInterop=true,forceLong=string,useOptionals=true,useDate=false,lowerCaseServiceMethods=true"

# Path to this plugin, Note this must be an abolsute path on Windows
PLUGIN_PATH="${SCRIPT_PATH}/../node_modules/.bin/protoc-gen-ts_proto"

SECRET_DIR="${SCRIPT_PATH}/SecretNetwork/proto"
SECRET_THIRD_PARTY_DIR="${SCRIPT_PATH}/SecretNetwork/third_party/proto"

protoc \
  --plugin="protoc-gen-ts_proto=${PLUGIN_PATH}" \
  --ts_proto_out="${OUT_DIR}" \
  --ts_proto_opt="${TS_PROTO_OPTS}" \
  --proto_path="$SECRET_DIR" \
  --proto_path="$SECRET_THIRD_PARTY_DIR" \
  $(find ${SECRET_DIR} ${SECRET_THIRD_PARTY_DIR} -path -prune -o -name '*.proto' -print0 | xargs -0)