import {db} from '../utils/db' // db사용을 위함.
import {InsertResult, sql} from 'kysely'
/**
 * @author LuticaCANARD
 * - member과의 차이점 : user는 login이후의 사용자 정보를 의미하고, member는 login 하기 이전의 회원정보를 의미한다. 
 * - 의미혼동이 의심되면 member를 더 적절히 바꾼다.
 */

/**
 * 유저 id로 User의 모든 정보를 가져온다.
 * @param id 
 */
export const getUserInfo = async(id:number)=>{
    const ret=await db.selectFrom("USERS").select(["createdAt","email","id","loginId","phone","updatedAt"]).where("USERS.id","=",id).executeTakeFirst();
    return ret;
}