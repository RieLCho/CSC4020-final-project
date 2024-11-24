# One-Command

```
pnpm run setup
```

구글 드라이브에서 output.json 파일을 다운로드 받아 db에 삽입합니다.

# 데이터 초기화 하고 싶을 땐

```
pnpm run setup-dev
```

# output.json이 다운로드 되지 않거나 이미지 서버가 작동하지 않을 때

```
pnpm run setup-example
```

example.json을 output.json 대신으로 사용합니다.

# Local Docker Setup

```
# Pull Postgres docker image
docker pull postgres

# Create container named 'drizzle-postgres'
docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
```

## When docker doesn't launch at WSL2

```
sudo dockerd
```

## create .env file

```
DATABASE_URL=postgres://postgres:mypassword@localhost:5432/postgres
```

# How to restart docker

```
docker start drizzle-postgres
```

# Sync Schema in postgres

```
npx drizzle-kit push
```

# Put data in to Database (Output.json needed)

```
pnpm run insert-json
```

```
➜  backend git:(main) ✗ pnpm run insert-json

> @ insert-json /Users/yangjin.cho/Desktop/workspace/CSC4020-final-project/backend
> npx tsx src/index.ts

All dialogues have been inserted into the database!
```

# How to get inside postgres docker container

```
sudo docker exec -it drizzle-postgres psql -U postgres
```

# Api Test curl

```
curl -X POST http://localhost:3000/blue_archive/search -H "accept: application/json" -H "content-type: application/json" -d '{
  "query": "······음?",
  "page": 1,
  "size": 9
}'
```
