// 사실상 깡통
import express from "express";
import {Request, Response, NextFunction} from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { memberRegister } from './server/controller/member/register';
import session from 'express-session'
import IdPwFinderRouter from './server/controller/member/findIdPw'
import dotenv from 'dotenv' 
import ViteExpress from "vite-express";
import {ChatSendProcessor} from './server/controller/chatting'
import { createGroup } from "./server/controller/group";
import { sendMsg } from "./server/controller/chatting";
import BodyParser from'body-parser'
import https from 'https';
import fs from 'fs';
import passport from 'passport'
import passportConfig from './server/middleware/passport/index'
dotenv.config() //...
passportConfig();

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
const port = 12345;
const app = express(); 
const io = new Server(createServer(app));
const https_use = process.env["https_private_key"]; // mkcert로 https 사용하면 그때 판정

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
app.use(passport.initialize());
app.use(passport.session()); 
io.engine.use(session_setting);
io.use((socket, next) => {
  session_setting(socket.request as Request, {} as Response, next as NextFunction);
});

// app.get("/", (req, res) => {
//   res.json({ key: "value" });
// });
const api_router = express.Router();
api_router.post("/regist", memberRegister)
api_router.post("/login", (req, res, next) => { passport.authenticate('local',{ failureRedirect: '/login' }, function(err, user, info) {
  if (err) { return next(err); }
  if (!user) { return res.redirect('/login'); }
  req.logIn(user, function(err) {
    ;
    if (err) { res.status(403).json({
      "result" : false
  });  }
      //res.cookie('logined','true')
      res.status(200).cookie('UUID',user, { maxAge: 900000, httpOnly: true }).json({
        ID : req.session["userId"],
        "result" : true
    })
  });
})(req, res, next);});
api_router.post("/logout",(req,res,next)=>{
  req.logout((err)=>{
    
    res.status(400);
  });
  res.cookie('logined','null');

  res.json({res:true});
});
api_router.use('/idpwfind',IdPwFinderRouter);
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



// SSR (vite-express) Guide :
// https://github.com/szymmis/vite-express

// T.F
function transformer(html: string, req: express.Request) {
  let os = html.replace(
    "<!-- placeholder -->", // I(s) 
    `<meta name="custom" content="${req.baseUrl}"/>` // O(s)
    // 멱등성 무의미.
  )
  os = os.replace("<!-- !host! -->",'')
  return os;
}


ViteExpress.config({
  ignorePaths:/{\/api\/*}/, // api/ 로 시작하는 모든 요청에 대하여 SSR무시.
  transformer
})

if(https_use!=undefined){
  const SSLOptions = {
    key: fs.readFileSync(process.env["https_private_key"]),
    cert: fs.readFileSync(process.env["https_public_key"])
  };
  const server = https.createServer(SSLOptions,app);
  server.listen(port,()=>{
    console.log(`Server running on https://localhost:${port}`);
  });
  ViteExpress.bind(app,server)
}else{
  ViteExpress.listen(app,port,()=>{
    console.log(`Server running on http://localhost:${port}`);
  });
}

