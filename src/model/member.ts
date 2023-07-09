import {db} from '../utils/db' // db사용을 위함.
import {sql} from 'kysely'

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

export const register = async (loginId: string, email: string, pw: string, phone?: string) : Promise<void> => {
	// 같은 이메일이 존재하는지 찾기
	const existingUser = await db
	.selectFrom("USERS")
	.where("email", "=", email)
	.select(["USERS.email"])
	.executeTakeFirst();

	// 같은 이메일이 존재하면 회원가입 실패
	if(existingUser) {
		console.log("이미 가입된 이메일이 존재합니다.");
		return;
	}
	// 같은 이메일이 존재하지 않으면 USERS 테이블에 회원가입 유저 정보 삽입
	await db.insertInto("USERS").values({ loginId, pw, email, phone }).execute();

	console.log("회원가입이 성공적으로 완료되었습니다.");
}