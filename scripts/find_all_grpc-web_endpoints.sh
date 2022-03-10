#!/bin/bash

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

grep -Pr 'protobufPackage|methodName' "${SCRIPT_PATH}/../src/protobuf_stuff" |
    awk '/protobufPackage/{package = $5} /methodName/{print "/"package"/"$3}' |
    sort -u |
    grep -v reflection |
    tr -d , |
    tr -d ';' |
    tr -d '"'