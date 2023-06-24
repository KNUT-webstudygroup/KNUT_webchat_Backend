import { Request,Response } from "express" 

/** 
 * @LuticaCANARD
 * 기능 구현 명세 :
 * - 1: 로그인 할 Id , Pw 수령(평문)
 * - 2: Pw는 규정된 해싱 방법으로 가공 ~> 솔트는 생각해봄 
 * - 3: ID / (해싱된) PW 가 같은 멤버정보 취득 
 * - 4: 있다면 UUID를 통하여 세션 발급하고 세션값 갱신을 통하여 유저정보 삽입.
 * - 5: 세션은 redis에 저장함.(추가전 사항이므로 일단 구현 안해도됨.)
 */

/**
 * @LuticaCANARD
 * ID찾기/비밀번호 찾기
 * - ID 찾을때는 인증메일을 보내게 해야하는데 이건 조금 복잡하니 나중에
 * - PW도 일단 대기 
 * 
 */

/**
 * @LuticaCANARD
 * - login endpoint를 처리할 때 사용할 함수
 */

export const userLogin = (req:Request<{}, any, any, Record<string, any>>,res:Response) =>{

	console.log(
    `요청에서 온 아이디는 ${req.body.id}, 비밀번호는 ${req.body.pw}입니다.`
  );
  res.json({ key: true });
}