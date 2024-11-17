# Apply code changes to the database

npx drizzle-kit push

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
