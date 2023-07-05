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
	.where("email", "=" ,email)
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
