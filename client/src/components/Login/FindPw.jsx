import { useState } from "react";
import { validateEmail } from "../../utils/Validation";
import { LoginInput } from "../common/LoginInput";

// import styles from "../../scss/components/Email.module.scss";
import styles from "../../scss/components/FindpwForm.module.scss";
import { useAuth } from "./AuthContext";

export default function FindPw() {
    const {
        email,
        setemail,
        requestcode,
        verifycode,
        emailValid,
        setemailValid,
        codesend,
        codeInput,
        setcodeInput,
        codeVerify,
    } = useAuth();

    // 이메일 입력 시 유효성 체크
    const emailchange = e => {
        setemail(e.target.value);
        setemailValid(validateEmail(e.target.value));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>비밀번호 찾기</h1>
            <p className={styles.subtitle}>
                비밀번호를 확인할 이메일 주소를 입력해주세요.
            </p>
            <form className={styles.joinForm}>
                <LoginInput
                    name="이메일"
                    id="email"
                    type="email"
                    value={email}
                    placeholder="예) scene@naver.com"
                    onChange={emailchange}
                />
                <button
                    type="button"
                    title="이메일인증"
                    disabled={!emailValid}
                    onClick={() => requestcode(email)}
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
                                onClick={() => verifycode(email, codeInput)}
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
            </form>
        </div>
    );
}
