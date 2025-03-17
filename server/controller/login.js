const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// 로그인확인 API
router.post("/", async (req, res) => {
    const { email, pw } = req.body;
    try {
        //회원확인
        const [user] = await db.query(
            "select * from member where user_id = ? and pw = ?",
            [email, pw]
        );
        console.log("로그인DB진입:", req.body);
        if (user.length === 0) {
            return res
                .status(404)
                .json({ error: "이메일 또는 비밀번호를 확인해주세요." });
        }

        //토큰생성
        const token = jwt.sign(
            {
                id: user[0].member_id,
                name: user[0].name,
                user_id: user[0].user_id,
            },
            JWT_SECRET,
            { expiresIn: "1h" } // 유효시간
        );
        //토큰검증
        jwt.verify(token, JWT_SECRET, err => {
            if (err) {
                return res.status(401).json({
                    error: "로그인이 만료되었습니다. 다시 로그인하세요.",
                });
            }
        });
        //user와 token 반환
        return res.status(200).json({
            user: {
                id: user[0].member_id,
                name: user[0].name,
                user_id: user[0].user_id,
            },
            token,
        });
    } catch (error) {
        console.error("서버로그인오류:", error);
        res.status(500).json({
            error: "로그인에 실패했습니다. 다시 시도해주세요.",
        });
    }
});
module.exports = router;
