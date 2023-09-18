import {db} from '../utils/db' // db사용을 위함.
import {InsertResult, sql} from 'kysely'

/**
 * 그룹 관련 DB와 소통하는 함수만 담음.
 */

export const insertChat = async (
    group_id:number,
    user_id:number,
    chat_content:string,
    //image_ids:number[]
) : Promise<InsertResult[]> => {
    /*if(image_ids.length>0) {
        await db.insertInto("GroupChatsImage").values({});
    }*/ // 이미지 저장로직

    return await db.insertInto("GroupChats").values({
        groupId : group_id,
        userId : user_id,
        message : chat_content
    }).execute();
}