import axios from "axios";
import { useState } from "react";
import { validateEmail } from "../../utils/Validation";
import { LoginInput } from "../common/LoginInput";

import styles from "../../scss/components/Email.module.scss";
import { useAuth } from "./AuthContext";

export default function Email() {
    // const [code, setcode] = useState("");
    // const [codeValid, setcodeValid] = useState(false);

    const {
        email,
        setemail,
        emailValid,
        setemailValid,
        joinRequestcode,
        joinVerifycode,
        codeVerify,
        codeInput,
        setcodeInput,
        codesend,
    } = useAuth();
    // 이메일 입력 시 유효성 체크
    const emailchange = e => {
        setemail(e.target.value);
        setemailValid(validateEmail(e.target.value));
    };

    return (
        <>
            <LoginInput
                name="이메일"
                id="email"
                type="email"
                value={email}
                placeholder="예) scene@naver.com"
                onChange={emailchange}
                readOnly={codeVerify}
            />
            <button
                type="button"
                disabled={!emailValid}
                title="이메일인증"
                onClick={() => joinRequestcode(email)}
                className={`${styles.btnSubmit} ${
                    emailValid ? styles.active : styles.disabled
                } ${codeVerify && styles.hidden}`}
            >
                {codesend ? "재전송" : "이메일 인증"}
            </button>
            {codesend && !codeVerify && (
                <div className={styles.codeContainer}>
                    <div className="flex w-full gap-2">
                        <input
                            type="text"
                            placeholder="인증번호 6자리 입력"
                            onChange={e => setcodeInput(e.target.value)}
                            maxLength={6}
                            readOnly={codeVerify}
                            className={styles.codeInput}
                        />
                        <button
                            type="button"
                            onClick={() => joinVerifycode(email, codeInput)}
                            disabled={codeVerify || codeInput.length !== 6}
                            className={`${styles.btnSubmit} ${
                                codeInput.length === 6 && !codeVerify
                                    ? styles.active
                                    : styles.disabled
                            }`}
                        >
                            {codeVerify ? "인증완료" : "확인"}
                        </button>
                    </div>
                </div>
            )}
            {codeVerify && (
                <p className={styles.codeVerify}>
                    이메일 인증이 완료되었습니다.
                </p>
            )}
        </>
    );
}
