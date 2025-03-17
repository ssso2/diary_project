const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");

// Naver SMTP 서버 설정
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT), // TLS를 사용할 때
    secure: false, // TLS를 사용하면 false, SSL을 사용하면 true
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// 메일 전송 API
router.post("/", async (req, res) => {
    const { email } = req.body;
    const code = Math.random().toString(36).toUpperCase().slice(2, 8);
    const mailOptions = {
        from: `"[씬-기록]" <${process.env.EMAIL_USER}>`, // 보내는 사람
        to: email, // 받는 사람
        subject: "[씬-기록] 이메일 인증코드를 확인해주세요.", // 이메일 제목
        text: `안녕하세요. 이메일 확인을 위한 인증코드를 보내드립니다. 씬-기록 인증코드는 ${code}입니다. 씬-기록 페이지로 돌아가 코드를 입력해주세요.`, // 이메일 본문
    };
    try {
        console.log("비밀번호찾기DB진입", email, code);

        //회원 확인
        const [userExist] = await db.query(
            "select * from member where user_id = ?",
            [email]
        );
        console.log("회원 정보", userExist);
        if (!userExist || userExist.length === 0) {
            console.log("없는이메일");
            return res.status(404).json({ error: "등록된 이메일이 없습니다." });
        }

        //코드 존재 확인
        const [codeExist] = await db.query(
            "select * from findPW WHERE user_id = ?",
            [email]
        );
        if (codeExist.length > 0) {
            //기존 코드있을 때 업데이트
            await db.query("update findPW set code = ? WHERE user_id = ?", [
                code,
                email,
            ]);
            console.log("기존 인증코드 업데이트:", code);
        } else {
            //코드 없을때 추가
            await db.query("insert into findPW (user_id, code) VALUES (?, ?)", [
                email,
                code,
            ]);
            console.log("새 인증코드 생성:", code);
        }
        // 이메일 전송
        await transporter.sendMail(mailOptions);
        console.log("이메일전송성공", code);
        return res.status(200).json({
            code: code,
            message: "이메일로 인증코드를 보냈습니다.",
        });
    } catch (error) {
        console.error("이메일 전송 오류:", error);
        res.status(500).json({
            error: "인증번호 전송에 실패했습니다. 다시 시도해주세요.",
        });
    }
});

//코드확인
router.post("/codecheck", async (req, res) => {
    const { email, codeInput } = req.body;
    try {
        console.log("코드확인진입", email, codeInput);
        const [Verify] = await db.query(
            "select * from findPW where user_id = ?",
            [email]
        );
        console.log("비밀번호테이블확인", Verify);
        if (!Verify || Verify.length === 0) {
            console.log("디비조회", Verify);
            return res.status(404).json({
                error: "이메일에 해당하는 인증번호가 없습니다.",
            });
        }
        if (Verify[0].code !== codeInput) {
            console.log("인증번호확인진입");
            return res
                .status(400)
                .json({ error: "인증번호가 일치하지않습니다." });
        }
        return res.status(200).json({
            codeInput: Verify[0].code,
            message: "이메일 인증에 성공했습니다.",
        });
    } catch (error) {
        console.error("서버오류", error);
        error.status(500).json({
            error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
    }
});

router.post("/member", async (req, res) => {
    const { email, pw } = req.body;
    try {
        console.log("비밀번호변경DB접근", email, pw);
        await db.query("update member set pw = ? WHERE user_id = ?", [
            pw,
            email,
        ]);
        res.status(200).json("비밀번호변경이 완료되었습니다.");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
