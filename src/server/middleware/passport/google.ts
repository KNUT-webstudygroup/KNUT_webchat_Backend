import passport from 'passport';
import GoogleStrategy from 'passport-google';
import bcrypt from 'bcrypt';


// @author @LuticaCANARD 
// TODO : 멤버 직렬화 구현
// TODO : google API 와 연동 처리요구.
// 참조 :
// https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-Passport-%EB%AA%A8%EB%93%88-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%B2%98%EB%A6%AC%EA%B3%BC%EC%A0%95-%F0%9F%92%AF-%EC%9D%B4%ED%95%B4%ED%95%98%EC%9E%90
// https://www.passportjs.org/tutorials/password/prompt/
export default ()=>{
    //? auth 라우터에서 /login 요청이 오면 local설정대로 이쪽이 실행되게 된다.
    // passport.use(
    //     new GoogleStrategy.Strategy(
    //         {
    //             //* req.body 객체인자 하고 키값이 일치해야 한다.
    //             usernameField: 'email', // req.body.email
    //             passwordField: 'password', // req.body.password
    //             /*
    //             session: true, // 세션에 저장 여부
    //             passReqToCallback: false, 
    //             express의 req 객체에 접근 가능 여부. true일 때, 뒤의 callback 함수에서 req 인자가 더 붙음. 
    //             async (req, email, password, done) => { } 가 됨
    //             */
    //         },
    //         //* 콜백함수의  email과 password는 위에서 설정한 필드이다. 위에서 객체가 전송되면 콜백이 실행된다.
    //         async (email, password, done) => {
    //             try {
    //                 // TODO : google측 로직 확인.
    //                 //TODO : 멤버 확인 로직 이전.
    //                 // 가입된 회원인지 아닌지 확인
    //                 const exUser = true;
    //                 // 만일 가입된 회원이면
    //                 if (exUser) {
    //                     // 해시비번을 비교
    //                     const result = true; 
    //                     if (result) {
    //                         done(null, exUser); //? 성공이면 done()의 2번째 인수에 선언
    //                     } else {
    //                         done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); //? 실패면 done()의 2번째 인수는 false로 주고 3번째 인수에 선언
    //                     }
    //                     //? done()을 호출하면, /login 요청온 auth 라우터로 다시 돌아가서 미들웨어 콜백을 실행하게 된다.
    //                 }
    //                 // DB에 해당 이메일이 없다면, 회원 가입 한적이 없다.
    //                 else {
    //                     done(null, false, { message: '가입되지 않은 회원입니다.' });
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //                 done(error); //? done()의 첫번째 함수는 err용. 특별한것 없는 평소에는 null로 처리.
    //             }
    //         },
    //         ),
    //         );
        };