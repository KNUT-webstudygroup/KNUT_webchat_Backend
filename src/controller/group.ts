/**
 * @LuticaCANARD
 * 기능 명세 :
 * - 1. 인증된 유저가 그룹 및 채널을 만드려 한다.
 * - 2. 일단 SQL injection 검사(보통 됨)
 * - 3. Mysql에 소속 채널과 이름 넣기
 * - 4. 채팅창 ID 발급. 
 * - 5. ID발급시 웹소켓이 살아있다면 바로 업데이트 신호
 * - 6. MYSQL 단에서 서버의 업데이트 시간을 변경... > 유저의 버전관리때 쓸 수 있음.(캐싱의 일종)
 */



import {User} from '../types/member'

let udserid = 1;
const user:User = {
    id:udserid
}

