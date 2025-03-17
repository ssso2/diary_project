const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//본인인증
router.post("/", async (req, res) => {
    const { id, pw } = req.body;
    try {
        //회원확인
        const [user] = await db.query(
            "select * from member where member_id = ? and pw = ?",
            [id, pw]
        );
        console.log("본인인증DB진입:", req.body, user);
        if (user.length === 0) {
            return res
                .status(404)
                .json({ error: "비밀번호가 일치하지않습니다." });
        }

        return res.status(200).json({
            message: "본인인증에 성공하였습니다.",
        });
    } catch (error) {
        console.error("본인인증 서버오류:", error);
        res.status(500).json({
            error: "본인인증에 실패했습니다. 다시 시도해주세요.",
        });
    }
});

//비밀번호수정
router.post("/modify", async (req, res) => {
    const { id, pw } = req.body;
    try {
        const [user] = await db.query(
            "update member set pw = ? where member_id = ? ",
            [pw, id]
        );
        console.log("비밀번호업데이트DB진입:", req.body, user);
        if (user.length === 0) {
            return res
                .status(404)
                .json({ error: "회원정보가 일치하지않습니다." });
        }
        return res.status(200).json({
            message: "비밀번호 변경에 성공하였습니다.",
        });
    } catch (error) {
        console.error("비밀번호변경 서버오류:", error);
        res.status(500).json({
            error: "비밀번호변경에 실패했습니다. 다시 시도해주세요.",
        });
    }
});

module.exports = router;
