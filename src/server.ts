// 사실상 깡통
import express from "express";
import {Request, Response, NextFunction} from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { userLogin } from "./controller/member/login"
import { memberRegister } from './controller/member/register';
import session from 'express-session'
import IdPwFinderRouter from './controller/member/findIdPw'
import dotenv from 'dotenv' 
import {ChatSendProcessor} from './controller/chatting'
import { createGroup } from "./controller/group";
import { sendMsg } from "./controller/chatting";
import BodyParser from'body-parser'
dotenv.config() //...

declare module "http" { // d.ts만들어서 나중에 분리하기.
  interface IncomingMessage {
      session: session.Session & {
          authenticated: boolean,
          count:number,
          userid
      }
  }
}


// http 서버 넣어주자.
const port = 4300;
const app = express(); 
const io = new Server(createServer(app));
app.use(express.json());
app.use(cors({
  credentials: true
}));
app.use(express.Router());
app.use(BodyParser.urlencoded({
  extended: true
}));

const session_setting = session({
  secret: process.env["session_salt"]||"AMUSOGUM",
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000,
    httpOnly: true,
  },
})
app.use(session_setting)
io.engine.use(session_setting);
io.use((socket, next) => {
  session_setting(socket.request as Request, {} as Response, next as NextFunction);
});

app.get("/", (req, res) => {
  res.json({ key: "value" });
});

app.use('/idpwfind',IdPwFinderRouter);
app.post("/regist", memberRegister)
app.post("/login", userLogin);
app.post("/group", createGroup);
app.post("/message", sendMsg);

io.on('connection',function(socket){
  const req = socket.request;
  console.log('a')
  socket.use((__, next) => {

    req.session.reload((err) => {
      if (err) {
        socket.disconnect();
      } else {
        next();
      }
    });
  });

  // and then simply
  socket.on("my event", () => {
    req.session.count++;
    req.session.save();
  });
})
io.on('send_chat',ChatSendProcessor)


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 웹소켓 서버의 역할 : KAFKA에서 일어난 이벤트(멘션,채팅)을 전달시키는 용도에 한정
// HTTP 서버의 역할 : 그 외 전체.