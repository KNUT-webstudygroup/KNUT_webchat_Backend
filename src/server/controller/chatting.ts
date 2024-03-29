import {Socket} from 'socket.io';
import { insertChat } from '../model/chatprocess';
import { Request, Response } from "express";
import { insertMsg } from "../model/message";
import { isObjectBindingPattern } from 'typescript';

/**
 * @author LuticaCANARD
 * 기능 명세 :
 * - 1. 인증된 유저가 그룸에 채팅을 보내고 싶다...
 * - 2. 일단 SQL injection 검사(보통 됨)
 * - 3. 채팅은 MongoDB에 넣기 ~> 이때 바꿀거 있으면 바꾸기...
 * - 4. 유저에게 업데이트.
 * - 5. 그 그룹에 살아있고, 조건에 맞는 웹소켓 ID 를 확인하고, 웹소켓 발신
 * - 6. 이미지를 보냈다면 이미지 검증 (해킹의 위험) 후 CDN에 넣기 (차후)  
 */

export const ChatSendProcessor = async (req:Socket) =>
{
    /**
     * TODO : 0910 // 채팅 수발신 구현.
     * - 단독집행
     * > 1) XSS / SQL injection 공격방어 검사
     * > 2) 유저 번호를 받고-> 세션이 가진 유저번호와 같은지 검사하고 -> 서버번호 검증 -> 메세지 삽입 (끝)
     * >> 메세지 삽입시 유의사항 :
     * - WS의 사용이 확인된 바, ws메세지 발신을 추진한다.
     * - 결정에 따라서 몽고DB의 사용을 정의.
     * - 채팅 입력받는건 HTTP로 받자. -> 이젠트 발신이 문제. socket.io로 하면 괜찮을지도.
     */
    
    /*
    Schema
    {
        group_id : number
        chat : ""
    }
    */
    const group_id = Number(req.data["group_id"])
    //req.
    const content = req.data["chat"]
    //insertChat(group_id,,content)    
 }
    

export const sendMsg = async (req:Request, res:Response) => {
	const { content, sender, groupId } = req.body;
	console.log("req.body", req.body);

    
    // 여기서 mongoDB로 바꾸는건 서로누나몫으로!
    const result = await insertMsg(content, sender, groupId);
    
    if(result[0]?.numInsertedOrUpdatedRows > 0) {
		console.log("성공적으로 메시지가 전송되었습니다.");
		return res.status(200).json({
            result:true
        });
	}
	else {
		console.log("서버로부터 요청이 거부되었습니다.");
		return res.status(500).json({
            result:false
        });
    }
}