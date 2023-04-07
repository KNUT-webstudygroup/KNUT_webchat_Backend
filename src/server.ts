// 사실상 깡통
import express from "express";
import { createServer } from "http";
import { WebSocket } from "ws";

// http 서버 넣어주자.
const port = 4300
const app = express();
app.use(express.json());
app.get('/',(req,ret)=>{

    ret.json({"key":"val"})
})

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});