#!/bin/bash -ex

# Made for Server Use, always check the generated .env
# Creates .env from .env.example
# Expected format: bash create-env-file.sh $NODE_ENV
# Example: base create-env-file.sh test

# Check for customer
if [ -z "$1" ]
then
  echo "ERRO! Ambiente NodeJS não foi encontrado"
  exit 1
fi

NODE_ENV=${1}

if [ ! -f .env ]
then
  COMPANY_NAME=sozei
  RANDOM_FACTOR=$(date -Ins)-$RANDOM

  ENV_VARIABLES=("APP_SECRET_TOKEN" "REDIS_PASSWORD" "POSTGRESQL_PASSWORD")

  cp .env.example .env

  sed -i "s/^NODE_ENV=.*$/NODE_ENV=${NODE_ENV}/" .env

  for API_ENV_VAR in "${ENV_VARIABLES[@]}"
  do
    HASH=$(echo -n "${API_ENV_VAR}-${COMPANY_NAME}-${RANDOM_FACTOR}" | sha256sum | sed 's/ .*//')
    sed -i "s/^${API_ENV_VAR}=.*$/${API_ENV_VAR}=${HASH}/" .env
  done
else
  echo "Arquivo .env já existe - OK"
fi
