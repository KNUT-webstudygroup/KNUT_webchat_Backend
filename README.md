# KNUT WEBCHAT BACKEND

## How to start
1. Install dependency
```bash
npm install
```
2. Run!
```bash
npm run dev
```


# Planetscale 도입에 따른 DB 변경사항 (Mysql)
- 1. (planetscale)[https://app.planetscale.com/knut-web-std/]로 가서, Password 생성
- 2. Password 생성후, backend 파일에 있는 .env.sample파일 복사후 붙혀넣기 한 다음, .env파일로 이름 변경
- 3. DATABASE_URL에 발급된 PW입력.
- 4. __DB Table 생성및 수정 절차__ 에 따라서 테스트 실시.
# DB Table 생성및 수정 절차
- 1. Prisma 파일 수정
- 2. ```npx prisma generate```로 kysely를 반영하여 TS에 타입으로 지정
- 3. ```npx prisma db push``` 로 DB에 반영.

# TASKS.
1. 회원기능
- 회원의 가입
- 회원의 탈퇴
- 회원의 로그인
> MySQL로 충분. 
2. 채팅 기능 (CURD 구현을 목표.)
- 실시간 채팅 (WS) 
> Redis등에 유저와 연결의 키:밸류(웹소켓 ID) 저장..
- 채팅의 저장 (HTTP)
> 채팅의 저장은 가능하다면 MongoDB로 해서 OpenSearch의 도입이 가능하게...
> FRONT / BACK
-------- 중간 점검.