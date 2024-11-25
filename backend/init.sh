#!/bin/bash

sudo docker pull postgres

sudo docker run --name drizzle-postgres -e POSTGRES_PASSWORD=3942 -d -p 5432:5432 postgres

touch .env && echo "DATABASE_URL=postgres://postgres:3942@localhost:5432/postgres" > .env

pnpm i

npx drizzle-kit push

curl -L "https://drive.google.com/uc?export=download&id=107ZE_yvJK2ZUIVW1js0CXUohS_t6jETc" -o "output.json"

pnpm run insert-json