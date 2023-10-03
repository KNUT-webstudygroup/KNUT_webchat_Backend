import { Request, Response } from "express";
import { getUserInfoByLoginId, checkPw } from "../../model/member";
import { hashPw } from "../../utils/crypto";
import { client } from "../../utils/mongodb";

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

export const userLogin = async (req:Request,res:Response) =>{
  const { id, pw } = req.body;

  // 같은 로그인 아이디가 존재하는지 찾기
	const existingLoginId = await getUserInfoByLoginId(id);
	if(!existingLoginId) {
		console.log("아이디 또는 비밀번호가 일치하지 않습니다.");
		return res.status(403).json({
      "result" : false
    }); // 일치하지 않으면 403 에러 메시지 전송
	}

  // 비밀번호 해시
	const hashedPw = hashPw(pw);

  // 비밀번호가 일치하는지 확인
  const existingPw = await checkPw(id, hashedPw);
  if(!existingPw) {
		console.log("아이디 또는 비밀번호가 일치하지 않습니다.");
		return res.status(403).json({
      "result" : false
    }); // 일치하지 않으면 403 에러 메시지 전송
	}

  if (existingLoginId && existingPw) {
    console.log("로그인 성공!");

    req.session["userId"] = id;
    return res.status(200).cookie('UUID',id, { maxAge: 900000, httpOnly: true }).json({
      ID : req.session["userId"],
      "result" : true
    }
    );
  }

}
