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

        return res.status(200).json({ location: fileUrl });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// 다이어리등록
router.post("/write", upload.single("file"), async (req, res) => {
    console.log("코드확인진입", req.body);
    console.log("파일따로오나", req.file);
    const {
        id,
        title,
        genre,
        content,
        day,
        rate,
        before,
        after,
        posterThumbnail,
    } = req.body;

    const thumbnail = posterThumbnail
        ? posterThumbnail
        : req.file
        ? req.file.filename
        : "1741332504472.png"; // 기본 이미지 파일명

    try {
        console.log("다이어리등록 접근");
        await db.query(
            "INSERT INTO diary_entries (member_id, genre, title, content, date, rate, before_emotion, after_emotion, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id, genre, title, "내용", day, rate, before, after, thumbnail]
        );
        return res.status(200).json("다이어리가 등록되었습니다.");
    } catch (error) {
        console.error("등록서버오류", error);
        res.status(500).json({
            error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
    }
});

//다이어리 리스트 조회
router.get("/list/:id", async (req, res) => {
    const { id } = req.params;
    try {
        console.log("다이어리목록디비접근", id);
        const [diaries] = await db.query(
            "select * from diary_entries where member_id = ?",
            [id]
        ); // 쿼리 첫번째 배열만 반환하기위해 [diaries]
        res.status(200).json(diaries);
    } catch (error) {
        res.status(500).json(error);
    }
});

//다이어리리스트 북마크 상태 업데이트
router.post("/list/updatelist", async (req, res) => {
    try {
        const { newDiaryData } = req.body;
        const id = newDiaryData[0].member_id;
        console.log("다이어리업데이트DB 접근", newDiaryData, id);
        if (!newDiaryData || newDiaryData.length == 0) {
            return res
                .status(404)
                .json({ error: "업데이트 할 데이터가 없습니다." });
        }
        const queries = newDiaryData.map(({ id, bookmark }) =>
            db.query("UPDATE diary_entries SET bookmark = ? WHERE id = ?", [
                bookmark,
                id,
            ])
        );
        await Promise.all(queries); // 병렬실행

        // 업데이트 후 최신 데이터 다시 조회
        const [updatedData] = await db.query(
            "select * from diary_entries WHERE member_id = ?",
            [id]
        );
        console.log("업데이트데이터확인", updatedData);
        res.status(200).json({ success: true, diaryData: updatedData });
    } catch (error) {
        console.error("북마크업데이트에러", error);
        res.status(500).json({
            error: "다이어리 업데이트에 실패했습니다. 다시 시도해주세요.",
        });
    }
});

//다이어리 수정
router.post("/edit", upload.single("file"), async (req, res) => {
    console.log("수정진입", req.body);
    console.log("파일따로오나", req.file);
    const {
        id,
        diaryId,
        title,
        genre,
        content,
        thumbnail,
        day,
        rate,
        before,
        after,
        posterThumbnail,
    } = req.body;

    const serverthumbnail = posterThumbnail
        ? posterThumbnail
        : req.file
        ? req.file.filename
        : thumbnail
        ? thumbnail
        : "1741332504472.png"; // 기본 이미지 파일명

    try {
        console.log("다이어리수정 접근");
        await db.query(
            "UPDATE diary_entries SET genre = ?, title = ?, content = ?, date = ?, rate = ?, before_emotion = ?, after_emotion = ?, thumbnail = ? WHERE member_id = ? AND id = ?",
            [
                genre,
                title,
                "내용",
                day,
                rate,
                before,
                after,
                serverthumbnail,
                id,
                diaryId,
            ]
        );
        return res.status(200).json("다이어리가 수정되었습니다.");
    } catch (error) {
        console.error("다이어리수정에러", error);
        res.status(500).json(error);
    }
});

//다이어리 삭제
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        console.log("다이어리삭제 접근", id);
        await db.query("delete from diary_entries WHERE id = ? ", [id]);
        return res.status(200).json("다이어리가 삭제되었습니다.");
    } catch (error) {
        console.error("다이어리수정에러", error);
        res.status(500).json(error);
    }
});
module.exports = router;
