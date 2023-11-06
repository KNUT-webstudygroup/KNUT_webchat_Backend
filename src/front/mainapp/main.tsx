import cookie from 'react-cookies';
import React from 'react';
import { useNavigate,Link,Navigate } from "react-router-dom";
import { loginedState } from '../states'; //... wait...
import { useRecoilState } from 'recoil';
import axios from 'axios';
import {setCookie,getCookie} from '../cookie/cookie'


const mainPage = () => {

	const navigate = useNavigate()
	console.log(cookie.loadAll())
	const state = getCookie('logined') === 'true'; // TODO : 쿠키대신 더 좋은 로직 찾기.(비동기식 체크 추천.)
	const mover = useNavigate()

	if(!state) {
		React.useEffect(() => {});
		// 로그인 재검증 로직
		console.log("UUID Controller")
		return(
		<Navigate to={"/login/"}></Navigate >
		)// UUID가 없다면...  login page로 보내자.
	}
	
	const logoutButton= ()=>{
		axios.post("/api/logout",{})
		.then((r)=>{
			const maxAge =1000;
			setCookie("logined",null,{maxAge,
				expires: new Date(Date.now() + maxAge * 1000)});
			mover('/login');
		})
	}
	
	return(
		
		<div>
			<button onClick={logoutButton}>Log out</button>
			Login complete
		</div>
	)
}

export default mainPage