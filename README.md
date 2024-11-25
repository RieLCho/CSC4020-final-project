# CSC4020-final-project

데이터베이스설계 \_01 기말 프로젝트

![image](https://github.com/user-attachments/assets/bc892f88-cd42-44d2-acbc-574399ed9538)  
![image](https://github.com/user-attachments/assets/cc29303d-b187-4510-be9c-4ab13af7c5f5)  
![image](https://github.com/user-attachments/assets/6700e675-d7c9-444f-a003-a79996421e60)  
![image](https://github.com/user-attachments/assets/1e493d7c-9d0c-4586-9fe4-f722e9b7f398)

## 구동 전에 설치해야 하는 것

1. ![node.js](https://nodejs.org/en/download/package-manager)
2. ![pnpm](https://pnpm.io/installation)
3. ![docker](https://docs.docker.com/engine/install/ubuntu/)
4. ![nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script) (node.js 20.18 사용 시 스킵 가능)

## How to start backend

1. output.json이 없는 경우 (git clone 시)

<img width="766" alt="Screenshot 2024-11-24 at 11 28 56 AM" src="https://github.com/user-attachments/assets/63a61d0f-0fdb-40e5-a1cd-97617e4d1b81">

_도커가 켜져 있는 상태에서_

```
cd backend
nvm use
pnpm run setup
pnpm run start
```

pnpm run setup은 backend/init.sh 을 실행합니다.

설치 영상: https://youtu.be/kU7BJRSSR18

By running `pnpm run setup`, automatically pull docker, setup postgres docker container, download datas, insert data into your docker container.

2. output.json이 있는 경우 (eclass에 압축된 파일로 실행 시)

_도커가 켜져 있는 상태에서_

```
pnpm run setup-dev
```

3. output.json이 다운로드 되지 않을 경우

_도커가 켜져 있는 상태에서_

```
setup-example
```

example.json을 output.json으로 대신 사용합니다.
pnpm 커맨드들의 세부 내용은 backend/package.json의 script 부분을 확인하시면 됩니다.

## How to start frontend

```
cd frontend
nvm use
pnpm i
pnpm run dev
```
