#!/bin/bash

if node --version | awk -F '[v.]' '{if($2 > 16){exit 0}else{exit 1}}' ; then
    export NODE_OPTIONS=--openssl-legacy-provider
fi

make kill-localsecret >/dev/null 2>/dev/null
make run-localsecret >/dev/null 2>/dev/null &

npx jest --forceExit --runInBand "$@"

make kill-localsecret >/dev/null 2>/dev/null