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
        // text: `안녕하세요. 이메일 확인을 위한 인증코드를 보내드립니다. 씬-기록 인증코드는 ${code}입니다. 씬-기록 페이지로 돌아가 코드를 입력해주세요.`, // 이메일 본문
        html: `<div style="padding: 21px 20px 41px; line-height: 1.4; color: #333; background-color: #f5f5f5;">
    <h2 style="color: #ff7235;">안녕하세요.</h2>
    <p>이메일 확인을 위한 인증코드를 보내드립니다.</p>
    <p>
      <strong style="font-size: 18px;">
        인증코드: <span style="color: #ff7235;">${code}</span>
      </strong>
    </p>
    <p>씬-기록 페이지로 돌아가 코드를 입력해주세요.</p>
  </div>`,
    };
    try {
        console.log("이메일인증DB접근", req.body);
        const [userExist] = await db.query(
            "select * from member where user_id = ?",
            [email]
        );

        if (userExist.length > 0) {
            console.error("이메일 중복");
            return res.status(409).json({ error: "이미 가입된 이메일입니다." }); //409에러 리소스존재하지않을때(충돌)
        }

        const [emailExist] = await db.query(
            "select * from joinEmail where email = ?",
            [email]
        );
        if (emailExist.length === 0) {
            await db.query(
                "INSERT INTO `joinEmail` (email, code) VALUES (?,?)",
                [email, code]
            );
        } else
            await db.query("UPDATE joinEmail SET code = ? where email = ? ", [
                code,
                email,
            ]);
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
        console.log("코드확인DB진입", email, codeInput);
        const [Verify] = await db.query(
            "select * from joinEmail where email = ?",
            [email]
        );
        console.log("쿼리성공", Verify);
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
                .json({ error: "인증번호가 일치하지않습니다." }); // 잘못된 요청, 유효하지않은 값
        }
        return res.status(200).json({
            codeInput: Verify[0].code,
            message: "이메일 인증에 성공했습니다.",
        });
    } catch (error) {
        console.error("서버오류", error);
        error.status(500).json({
            error: "인증번호 확인에 실패했습니다. 다시 시도해주세요.",
        });
    }
});

router.post("/member", async (req, res) => {
    const { email, pw, name } = req.body;
    try {
        console.log("회원가입DB접근", email, pw, name);
        await db.query(
            "insert into member (user_id, pw, name) values (?,?,?)",
            [email, pw, name]
        );

        const [rows] = await db.query(
            "select member_id from member where user_id = ?",
            [email]
        );

        const id = rows[0].member_id;
        console.log("다이어리테이블DB접근", id);
        await db.query("insert into diaries (member_id) values (?)", [id]);
        console.log("회원가입 DB insert 성공");
        return res.status(200).json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
        res.status(500).json({
            error: "회원가입에 실패했습니다. 다시 시도해주세요.",
        });
    }
});

module.exports = router;
