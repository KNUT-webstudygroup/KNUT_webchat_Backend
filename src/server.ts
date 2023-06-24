// 사실상 깡통
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocket } from "ws";

// http 서버 넣어주자.
const port = 4300;
const app = express();
app.use(express.json());
app.use(cors());

const Register = [{
  id: "hello",
  pw: "dbalsrb",
}]

app.post("/regist", (req, res) => {
  const { id, pw } = req.body;
  console.log("req.body", req.body);
  Register.push({
    id,
    pw,
  })
})

app.get("/", (req, res) => {
  res.json({ key: "value" });
});

app.post("/login", (req, res) => {
  console.log(
    `요청에서 온 아이디는 ${req.body.id}, 비밀번호는 ${req.body.pw}입니다.`
  );
  res.json({ key: true });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 웹소켓 서버의 역할 : KAFKA에서 일어난 이벤트(멘션,채팅)을 전달시키는 용도에 한정
// HTTP 서버의 역할 : 그 외 전체.