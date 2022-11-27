#!/bin/bash

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

grep -Pr 'serviceName|methodName' "${SCRIPT_PATH}/../src/protobuf" |
    awk '/serviceName/{package = $3} /methodName/{print "/"package"/"$3}' |
    sort -u |
    grep -v 'cosmos.base.reflection' |
    grep -v 'tendermint.abci' |
    tr -d , |
    tr -d ';' |
    tr -d '"' |
    grep -P '(Service|Query)/'