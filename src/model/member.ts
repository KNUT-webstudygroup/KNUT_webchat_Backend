import {db} from '../utils/db' // db사용을 위함.
import {InsertResult, sql} from 'kysely'

/**
 * @LuticaCANARD
 * 여기는 DB와 소통하는 함수만 담음.
 */

export const findIdFromEmail = async (email: string) : Promise<{
	loginId: string;
}[]> => {
	const ret = await db
	.selectFrom("USERS")
	.where("email", "=", email)
	.select(["USERS.loginId"])
	.execute(); 
	return ret;
} 

export const getUserSecureQuest = async (id: string) : Promise<{
	quest: string;
}[]> => {
	return await db
	.selectFrom("AccountFindQuest")
	.where("loginId","=", sql`{id}`)
	.select(["AccountFindQuest.quest"])
	.orderBy("AccountFindQuest.questindex")
	.execute();
}

export const getUserInfoByLoginId = async (loginId: string) : Promise<{loginId:string}> => {
	// 같은 로그인 아이디가 존재하는지 찾기
	return await db
		.selectFrom("USERS")
		.where("loginId", "=", loginId)
		.select(["USERS.loginId"])
		.executeTakeFirst();
}

export const getUserInfoByEmail = async (email: string) : Promise<{email:string}> => {
	// 같은 이메일이 존재하는지 찾기
	return await db
		.selectFrom("USERS")
		.where("email", "=", email)
		.select(["USERS.email"])
		.executeTakeFirst();
}

export const register = async (loginId: string, email: string, pw: string, phone?: string) : Promise<InsertResult[]> => {
	// USERS 테이블에 회원가입 유저 정보 삽입
	return await db.insertInto("USERS").values({ loginId, pw, email, phone }).execute();
}