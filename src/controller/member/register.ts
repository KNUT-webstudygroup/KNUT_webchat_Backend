import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { RedisFlushModes } from "redis";
import { parseWhen } from "kysely/dist/cjs/parser/binary-operation-parser";


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
const prisma = new PrismaClient();
  
export const memberRegister = async (req: Request<{}, any, any, Record<string, any>>, res: Response) => {
	const { id, pw } = req.body;
	await prisma.user.create({
		data: {
		  loginId: id,
		  pw: pw,
		  email: "user@test1.com",
		},
	  });
	console.log("req.body", req.body);
}
