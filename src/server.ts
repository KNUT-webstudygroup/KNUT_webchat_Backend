// 사실상 깡통
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocket } from "ws";
import { userLogin } from "./controller/member/login"
import { memberRegister } from './controller/member/register';
import session from 'express-session'
import IdPwFinderRouter from './controller/member/findIdPw'
import dotenv from 'dotenv' 
dotenv.config() //...

// http 서버 넣어주자.
const port = 4300;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.Router());
app.use(
  session({
    secret: process.env["session_salt"]||"AMUSOGUM",
    resave: false,
    saveUninitialized: true,
  })

)

app.get("/", (req, res) => {
  res.json({ key: "value" });
});

app.use('/idpwfind',IdPwFinderRouter);
app.post("/regist", memberRegister)
app.post("/login", userLogin);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 웹소켓 서버의 역할 : KAFKA에서 일어난 이벤트(멘션,채팅)을 전달시키는 용도에 한정
// HTTP 서버의 역할 : 그 외 전체.