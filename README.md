# CSC4020-final-project

데이터베이스설계 \_01 기말 프로젝트

![image](https://github.com/user-attachments/assets/bc892f88-cd42-44d2-acbc-574399ed9538)  
![image](https://github.com/user-attachments/assets/cc29303d-b187-4510-be9c-4ab13af7c5f5)  
![image](https://github.com/user-attachments/assets/6700e675-d7c9-444f-a003-a79996421e60)  
![image](https://github.com/user-attachments/assets/1e493d7c-9d0c-4586-9fe4-f722e9b7f398)

## How to start backend

<img width="766" alt="Screenshot 2024-11-24 at 11 28 56 AM" src="https://github.com/user-attachments/assets/63a61d0f-0fdb-40e5-a1cd-97617e4d1b81">

*도커가 켜져 있는 상태에서*
```
cd backend
nvm use
pnpm run setup
pnpm run start
```
설치 영상: https://youtu.be/kU7BJRSSR18

By running `pnpm run setup`, automatically pull docker, setup postgres docker container, download datas, insert data into your docker container.

이후에 데이터 초기화 할 땐 `pnpm run setup-dev`

## How to start frontend

```
cd frontend
nvm use
pnpm i
pnpm run dev
```
