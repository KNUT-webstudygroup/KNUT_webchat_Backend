import { Request,Response } from "express";
import { getUserInfoByEmail, getUserInfoByLoginId, register } from "../../model/member";
import { hashPw } from "../../utils/crypto";

/** 
 * @LuticaCANARD
 * 기능 구현 명세 :
 * - 1: 등록할 ID/PW 수령
 * - 2: Pw는 규정된 해싱 방법으로 가공 ~> 솔트는 생각해봄 
 * - 3: ID 가 같은 멤버정보 취득 
 * - 4: 있다면 가입 불가
 * - 5: 없으면 Insert 하고 토큰 발급하던 로그인 페이지로 돌리던 해도 됨.
 * (login함수 호출이 빠름)
 */

/**
 * @LuticaCANARD
 * OAuth2.0 사용시 유의사항 
 * - 토큰과 계정은 n:1 관계임에 유의
 * - 토큰은 서버간 통신으로 받아옴...
 */
const Register = [{
	id: "hello",
	pw: "dbalsrb",
}] // ?
export const memberRegister = async (req:Request<{}, any, any, Record<string, any>>, res:Response) => {
	const { id, email, pw } = req.body;
	console.log("req.body", req.body);

	// 같은 로그인 아이디가 존재하는지 찾기
	const existingLoginId = await getUserInfoByLoginId(id);
	if(existingLoginId) {
		console.log("이미 가입된 아이디입니다.");
		return res.status(403).json({}); // 존재하면 403 에러 메시지 전송
	}

	// 같은 이메일이 존재하는지 찾기
	const existingEmail = await getUserInfoByEmail(email);
	if(existingEmail) {
		console.log("이미 가입된 이메일입니다.");
		return res.status(403).json({}); // 존재하면 403 에러 메시지 전송
	}

	// 비밀번호 해시
	const hashedPw = hashPw(pw);

	// DB에 회원가입 유저 정보 삽입
	const result = await register(id, email, hashedPw);

	if(result[0]?.numInsertedOrUpdatedRows > 0) {
		console.log("정상적으로 회원가입 되었습니다.");
		return res.status(200).json({});
	}
	else {
		console.log("서버로부터 요청이 거부되었습니다.");
		return res.status(500).json({});
	}
}