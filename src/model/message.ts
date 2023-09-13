import {db} from '../utils/db' // db사용을 위함.
import {InsertResult, sql} from 'kysely'

/**
 * 메시지 관련 DB와 소통하는 함수만 담음.
 */

export const insertMsg = async (content: string, sender: number, groupId: number) : Promise<InsertResult[]> => {
    // MESSAGES 테이블에 회원가입 유저 정보 삽입
    return await db.insertInto("MESSAGES").values({
        content,
        sender,
        groupId
    }).execute();
}