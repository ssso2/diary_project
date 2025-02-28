import { useState } from "react";

import { validateEmail, validatePassword } from "../../utils/Validation";
import { ErrorMessage } from "../common/Common";
import { LoginInput } from "../common/LoginInput";

import styles from "../../scss/components/LoginForm.module.scss";

export default function LoginForm({ loginGo }) {
    const [email, setemail] = useState("");
    const [pw, setpw] = useState("");
    const [errors, seterrors] = useState({ email: "", pw: "" });

    // 입력 변경 시 에러 메시지 초기화
    const Change = (setter, value, key) => {
        setter(value);
        seterrors(prev => ({ ...prev, [key]: "" }));
    };

    // 로그인 버튼 클릭 시 유효성 검사 실행
    const loginchk = async e => {
        e.preventDefault();

        let errorMessages = {};
        if (!validateEmail(email)) {
            errorMessages.email = "이메일 주소를 정확히 입력해주세요.";
        }
        if (!validatePassword(pw)) {
            errorMessages.pw =
                "영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)";
        }
        if (Object.keys(errorMessages).length > 0) {
            seterrors(errorMessages);
            return;
        }
        loginGo(email, pw);
    };

    return (
        <form onSubmit={loginchk}>
            <LoginInput
                name="이메일"
                id="email"
                type="email"
                value={email}
                placeholder="예) scene.naver.cosm"
                onChange={e => Change(setemail, e.target.value, "email")}
            />
            <ErrorMessage message={errors.email} />

            <LoginInput
                name="비밀번호"
                id="pw"
                type="password"
                value={pw}
                placeholder="비밀번호를 입력하세요."
                onChange={e => Change(setpw, e.target.value, "pw")}
            />
            <ErrorMessage message={errors.pw} />

            <button
                type="submit"
                disabled={!(email && pw)}
                className={`${styles.btnSubmit} ${
                    !(email && pw) ? styles.disabled : ""
                }`}
            >
                로그인
            </button>
        </form>
    );
}
