#!/bin/sh

set -eu

if [ "${1-}" = "test" ]; then
  npm test
else
  npm start
fi