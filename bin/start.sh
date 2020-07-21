#!/bin/bash

display_usage() {
  echo -e "\n This script build docker image and start container for it-landscape-web"
  echo -e "\nUSAGE:\n\n ${0} <build-tag>\n"
}

if [ $# -lt 1 ]; then
  display_usage
  exit 1
fi

SCRIPT_PATH=$(
  cd "$(dirname "${BASH_SOURCE[0]}")" || exit
  pwd -P
)
"${SCRIPT_PATH}"/build.sh "$1"

docker run -e REDIS_HOST="docker.for.mac.host.internal" \
-e BACKEND_URL="http://docker.for.mac.host.internal:8081" \
-p 5000:5000 \
"$1"
