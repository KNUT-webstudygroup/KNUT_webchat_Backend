/**
 * @LuticaCANARD
 * 기능 명세 :
 * - 1. 인증된 유저가 그룸에 채팅을 보내고 싶다...
 * - 2. 일단 SQL injection 검사(보통 됨)
 * - 3. 채팅은 MongoDB에 넣기 ~> 이때 바꿀거 있으면 바꾸기...
 * - 4. 유저에게 업데이트.
 * - 5. 그 그룹에 살아있고, 조건에 맞는 웹소켓 ID 를 확인하고, 웹소켓 발신
 * - 6. 이미지를 보냈다면 이미지 검증 (해킹의 위험) 후 CDN에 넣기 (차후)  
 */