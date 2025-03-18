const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db");
const app = express();

// Multer 설정 - 파일 저장 경로, 파일명
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "imgs/diary/upload");
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
router.post("/editor", upload.array("file"), (req, res) => {
    // console.log("에디터이미지접근");
    try {
        console.log("에디터이미지접근", req.files);
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "업로드된 파일이 없습니다." });
        }

        if (req.files.length > 5) {
            return res
                .status(400)
                .json({ error: "이미지는 최대 5개까지 업로드 가능합니다." });
        }
        // 파일 정상 처리
        const urls = req.files.map(
            file => `http://localhost:5001/imgs/diary/upload/${file.filename}`
        );
        return res.status(200).json({ urls });
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
