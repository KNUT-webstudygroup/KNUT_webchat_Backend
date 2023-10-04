// 사실상 깡통
import express from "express";
import {Request, Response, NextFunction} from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { userLogin } from "./server/controller/member/login"
import { memberRegister } from './server/controller/member/register';
import session from 'express-session'
import IdPwFinderRouter from './server/controller/member/findIdPw'
import dotenv from 'dotenv' 
import ViteExpress from "vite-express";
import {ChatSendProcessor} from './server/controller/chatting'
import { createGroup } from "./server/controller/group";
import { sendMsg } from "./server/controller/chatting";
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
const api_router = express.Router();
api_router.post("/regist", memberRegister)
api_router.post("/login", userLogin);
api_router.post("/group", createGroup);
api_router.post("/message", sendMsg);
app.use('/api',api_router)


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

// Guide : 
// https://github.com/szymmis/vite-express
ViteExpress.config({
  ignorePaths:/\/api\/*/g // api/ 로 시작하는 모든 요청에 대하여 SSR무시.

})
ViteExpress.listen(
  app,port,() => {
    console.log(`Server running on http://localhost:${port}`);
  }
)

