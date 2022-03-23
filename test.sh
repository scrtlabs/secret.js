#!/bin/bash

if node --version | awk -F '[v.]' '{if($2 > 16){exit 0}else{exit 1}}' ; then
    export NODE_OPTIONS=--openssl-legacy-provider
fi

npx jest --runInBand
