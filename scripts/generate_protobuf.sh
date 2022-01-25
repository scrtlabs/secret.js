#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

OUT_DIR="${SCRIPTPATH}/../src/protobuf_stuff"
mkdir -p "$OUT_DIR"

PLUGIN_PATH="${SCRIPTPATH}/../node_modules/.bin/protoc-gen-ts_proto"
TS_PROTO_OPTS="esModuleInterop=true,forceLong=long,useOptionals=true,useDate=false"

# Path to this plugin, Note this must be an abolsute path on Windows
PLUGIN_PATH="${SCRIPTPATH}/../node_modules/.bin/protoc-gen-ts_proto"

SECRET_DIR="${SCRIPTPATH}/SecretNetwork/proto"
SECRET_THIRD_PARTY_DIR="${SCRIPTPATH}/SecretNetwork/third_party/proto"

protoc \
  --plugin="protoc-gen-ts_proto=${PLUGIN_PATH}" \
  --ts_proto_out="${OUT_DIR}" \
  --ts_proto_opt="${TS_PROTO_OPTS}" \
  --proto_path="$SECRET_DIR" \
  --proto_path="$SECRET_THIRD_PARTY_DIR" \
  $(find ${SECRET_DIR} ${SECRET_THIRD_PARTY_DIR} -path -prune -o -name '*.proto' -print0 | xargs -0)