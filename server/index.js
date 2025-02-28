// Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
const express = require("express");
const app = express();
// const db = require("mysql2");
// const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
// const nodemailer = require("nodemailer");

//이미지업로드
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, "imgs/");
//         },
//         filename: (req, file, cb) => {
//             const ext = path.extname(file.originalname);
//             let fName =
//                 path.basename(file.originalname, ext) + Date.now() + ext;
//             //한글인코딩
//             let newFName = Buffer.from(fName, "latin1").toString("utf8");

//             cb(null, newFName);
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// });

// CORS 설정
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5001"],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/imgs", express.static(path.join(__dirname, "imgs")));

//로그인 라우터
const loginRouter = require("./controller/login.js");
app.use("/login", loginRouter);
//회원가입 라우터
const joinRouter = require("./controller/join.js");
app.use("/join", joinRouter);

//영화드라마목록 라우터
const listRouter = require("./controller/list.js");
app.use("/list", listRouter);

app.get("/", (req, res) => {
    console.log("백엔드 서버 진입"); //정상작동 확인
    res.send("백엔드 서버 진입");
});

app.get("*", (req, res) => {
    res.send("404에러");
});

app.listen(5001, () => {
    console.log("서버 실행");
});
