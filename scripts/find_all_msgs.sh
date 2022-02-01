#!/bin/bash
shopt -s extglob
shopt -s globstar

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

grep -nrP "export interface Msg.+? \{" "$SCRIPT_PATH"/../src/protobuf_stuff/**/{msg,tx}.ts |
    grep -vi response |
    perl -pe 's;.+?scripts/\.\./src;src;' |
    perl -pe 's/:export interface//' |
    tr -d \{ |
    column -t |
    sort
