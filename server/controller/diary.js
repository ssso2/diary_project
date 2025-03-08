const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db");

// Multer 설정 - 파일 저장 경로, 파일명
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "imgs/diary/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Multer설정 객체 생성
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 업로드 라우트
router.post("/upload", upload.single("file"), (req, res) => {
    console.log("이미지접근");
    try {
        if (!req.file) {
            return res.status(400).json({ error: "파일이 없습니다" });
        }

        // 요청 객체에서 호스트 정보를 가져와 URL 생성
        const protocol = req.protocol; // http 또는 https
        const host = req.get("host"); // 호스트 정보 (예: localhost:5001)
        // const fileUrl = `${protocol}://${host}/imgs/diary/${req.file.filename}`;
        const fileUrl = `http://localhost:5001/imgs/diary/${req.file.filename}`;
        // console.log( "파일 저장 경로:",
        //     path.join(__dirname, "../imgs/diary", req.file.filename)
        // );
        return res.status(200).json({ location: fileUrl });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// 다이어리등록
router.post("/write", async (req, res) => {
    console.log("코드확인진입", req.body);
    const { id, title, content, day, rate, before, after } = req.body.payload;
    try {
        console.log("트라이");
        await db.query(
            "INSERT INTO diary_entries (member_id, title, content, date, rate, before_emotion, after_emotion) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id, title, "내용", day, rate, before, after]
        );
        return res.status(200).json("다이어리가 등록되었습니다.");
    } catch (error) {
        console.error("서버오류", error);
        res.status(500).json({
            error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
    }
});

module.exports = router;
