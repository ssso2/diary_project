import { useEffect, useState } from "react";
import { validateName, validatePassword } from "../../utils/Validation";
import { ErrorMessage } from "../common/Common";
import { LoginInput } from "../common/LoginInput";
import Email from "./Email";
import AgreeCheck from "./AgreeCheck";

import styles from "../../scss/components/JoinForm.module.scss";
import { useAuth } from "./AuthContext";

export default function JoinForm() {
    const [agree, setagree] = useState(false);
    const [errors, seterrors] = useState({
        name: "",
        pw: "",
        pwchk: "",
    });
    const {
        name,
        setname,
        email,
        pw,
        setpw,
        pwchk,
        setpwchk,
        codeVerify,
        joinGo,
    } = useAuth();

    // 입력 변경 시 에러 메시지 초기화
    const Change = (setter, value, key) => {
        setter(value);
        seterrors(prev => ({ ...prev, [key]: "" }));
    };

    // 회원가입 버튼 클릭 시 유효성 검사 실행
    const joinchk = async e => {
        e.preventDefault();

        let errorMessages = {};
        if (!codeVerify) {
            alert("이메일 인증이 필요합니다.");
            return;
        }
        if (!validateName(name)) {
            errorMessages.name = "이름을 정확히 입력해주세요.";
        }
        if (!validatePassword(pw)) {
            errorMessages.pw =
                "영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)";
        }
        if (pw !== pwchk) {
            errorMessages.pwchk = "비밀번호가 일치하지않습니다.";
        }
        if (Object.keys(errorMessages).length > 0) {
            seterrors(errorMessages);
            return;
        }
        if (!agree) {
            alert("이용약관에 모두 동의해야 가입 가능합니다.");
            return;
        }

        joinGo(email, pw, name);
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>회원가입</p>
            <form onSubmit={joinchk} className={styles.joinForm}>
                <LoginInput
                    name="이름"
                    id="name"
                    type="text"
                    value={name}
                    placeholder="예) 김기록"
                    onChange={e => Change(setname, e.target.value, "name")}
                />
                <ErrorMessage message={errors.name} />

                <Email />
                <div className={styles.pwWrap}>
                    <LoginInput
                        name="비밀번호"
                        id="pw"
                        type="password"
                        value={pw}
                        placeholder="영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)"
                        onChange={e => Change(setpw, e.target.value, "pw")}
                    />
                    <ErrorMessage message={errors.pw} />

                    <LoginInput
                        name="비밀번호 확인"
                        id="pwchk"
                        type="password"
                        value={pwchk}
                        placeholder="영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)"
                        onChange={e =>
                            Change(setpwchk, e.target.value, "pwchk")
                        }
                    />
                    <ErrorMessage message={errors.pwchk} />
                </div>
                <AgreeCheck setagree={setagree} />

                <button
                    type="submit"
                    disabled={!(name && email && pw && pwchk)}
                    className={`${styles.btnSubmit} ${
                        !(name && email && pw && pwchk) ? styles.disabled : ""
                    }`}
                    title="가입"
                >
                    가입하기
                </button>
            </form>
        </div>
    );
}
