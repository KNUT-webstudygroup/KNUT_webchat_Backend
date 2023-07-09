import { Request,Response,Router } from "express" 
import { findIdFromEmail
				, getUserSecureQuest} from '../../model/member'


/**
 * 
 * 시범용으로 ID/PW찾기에 대한 예제.
 */

const findIdController = async (req: Request, res: Response) => {
	const email_to_find = req.body['email']
	const id_search = await findIdFromEmail(email_to_find);
	if (id_search.length == 0)  return res.json({"find":false});
	else return res.json({"find":true,"id":id_search[0]["id"]});
}

const findPwController = async (req: Request, res: Response) => {
/**
 * 1. 비밀번호는 찾는게 아니라 리셋시키는 것이 목표기 된다.
 * 2. 보안 질문에 답하게 한 뒤, 다 맞으면 그것에 따라서 리셋에 진입시키는 것이 목표.
 */
	const email_to_find = req.body['email']; // 1차적으로 이메일 확인
	const id_search = await findIdFromEmail(email_to_find)[0]["loginid"];
	const id_to_set = req.body['id'];
	if(id_search!=id_to_set) // 조기리턴을 통한 clean code
	return res.status(401).json({"res":false,"error":-1})
	// https://developer.mozilla.org/ko/docs/Web/HTTP/Status
	/**
	 * 질문 3개를 주고, < 여기까지
	 * 그 3개의 답과 질문이 같다면, 
	 * PW를 리셋시킨다. (실은 email을 보내주는게 좋지만 귀찮 )
	 */
	const questions = await getUserSecureQuest(id_search)
	const reps = {
		"questions" : questions,
		"res" : true
	}
	req.session['password_reset_id'] = id_search;
	return res.json(reps)
}

const setPwController =async (req: Request, res: Response) => {
	/**
	 * 
	 * 그 3개의 답과 질문이 같다면, 
	 * PW를 리셋시킨다.
	 */


}
const killBotGuards = async (req: Request, res: Response) => {
// 대규모 트래픽 차단
// 사실 cloudflare 들고 날르면 되긴 하는데 기초적인 절차구현해둘까 싶긴함
// robot.txt는 도입할데가 없
// TIMEOUT 도입해야할듯
	return res.json({}) // 뭐 일단 아무것도 안오면...
}

const router = Router();

router.get('*',killBotGuards)
router.post('/idfind',findIdController)
router.post('/pwfind',findPwController)
router.post('/pwset',setPwController)

export default router;