#!/bin/bash

display_usage() {
  echo -e "\n This script build docker image for bpd-frontend"
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
"${SCRIPT_PATH}"/init.sh

WORK_DIR=$(
  cd "$(dirname "$0")" || exit
  cd ..
  pwd
)

echo -e " \n WORK_DIR $WORK_DIR "

cd "${WORK_DIR}/client/" || exit
npm run build

cd "$WORK_DIR" || exit
docker build . -t "$1"
