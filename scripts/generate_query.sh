#!/bin/bash
set -o errexit -o nounset -o pipefail

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

(
    cd "${SCRIPT_PATH}/.."

    mkdir -p ./src/query

    find src/protobuf_stuff -name query.ts | 
        parallel 'echo "import { QueryClientImpl } from \"../{.}\";" > src/query/$(echo "{}" | perl -pe "s;/v1beta1/query;;" | perl -pe "s;src/protobuf_stuff/;;" | perl -pe "s;/;_;g") && perl -i -pe "s;../src/protobuf_stuff;../protobuf_stuff;" src/query/*ts'
)