const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

// CORS 설정
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:5001",
        process.env.SERVER_ADDRESS,
        process.env.CLIENT_ADDRESS,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/imgs", express.static(path.join(__dirname, "imgs")));
app.use(
    "img/editor",
    express.static(path.join(__dirname, "imgs/diary/upload"))
);

//로그인 라우터
const loginRouter = require("./controller/login.js");
app.use("/login", loginRouter);
//회원가입 라우터
const joinRouter = require("./controller/join.js");
app.use("/join", joinRouter);
//비밀번호찾기 라우터
const findRouter = require("./controller/find.js");
app.use("/find", findRouter);
//마이페이지 라우터
const myRouter = require("./controller/mypage.js");
app.use("/mypage", myRouter);

//영화목록 라우터
const listRouter = require("./controller/list.js");
app.use("/list", listRouter);

//다이어리 라우터
const diaryRouter = require("./controller/diary.js");
app.use("/diary", diaryRouter);
//에디터 라우터
const imgRouter = require("./controller/imgUpload.js");
app.use("/img", imgRouter);

app.get("/", (req, res) => {
    console.log("서버 진입"); //정상작동 확인
    res.send("서버 진입");
});

app.get("*", (req, res) => {
    res.send("404에러");
});

app.listen(PORT, () => {
    console.log("서버 실행");
});
