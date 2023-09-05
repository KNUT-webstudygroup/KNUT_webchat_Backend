import { AnyARecord } from 'dns';
import {db} from '../utils/db' // db사용을 위함.
import {InsertResult, sql} from 'kysely'

/**
 * 그룹 관련 DB와 소통하는 함수만 담음.
 */

export const createGroup = async (groupName: string, admin: number, capacity: number, total: number, groupDesc?: string, groupTag?: string) : Promise<InsertResult[]> => {
    // GROUPS 테이블에 회원가입 유저 정보 삽입
    return await db.insertInto("GROUPS").values({
        groupName,
        admin,
        capacity,
        total,
        groupDesc,
        groupTag,
    }).execute();
}