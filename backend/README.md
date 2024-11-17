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

# How to get inside postgres docker container

```
sudo docker exec -it drizzle-postgres psql -U postgres
```
