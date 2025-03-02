import axios from "axios";
import { useState } from "react";
import { validateEmail } from "../../utils/Validation";
import { LoginInput } from "../common/LoginInput";

import styles from "../../scss/components/Email.module.scss";

export default function Email({ email, setemail, codeVerify, setcodeVerify }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const [emailValid, setemailValid] = useState(false);
    const [code, setcode] = useState("");
    const [codesend, setcodesend] = useState(false);
    const [codeValid, setcodeValid] = useState(false);
    const [codeInput, setcodeInput] = useState("");

    // 이메일 입력 시 유효성 체크
    const emailchange = e => {
        setemail(e.target.value);
        setemailValid(validateEmail(e.target.value));
    };

    // 이메일 인증 요청
    const requestcode = async () => {
        try {
            const res = await axios.post(`${URL}/join`, {
                email,
            });
            setcodesend(true);
            setcode(res.data.code);
            setcodeValid(true);
            alert(`이메일로 인증코드를 보냈습니다. ${res.data.code}`);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    // 인증 코드 확인
    const verifycode = async () => {
        try {
            const coderes = await axios.post(`${URL}/join/codecheck`, {
                email,
                codeInput,
            });
            setcodeVerify(true);
            alert(coderes.data.message);
        } catch (error) {
            const message =
                error.response.data?.error || "인증에 실패했습니다.";
            alert(message);
        }
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
                // readOnly={codeVerify}
            />
            <button
                type="button"
                disabled={!emailValid}
                onClick={requestcode}
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
                            onClick={verifycode}
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
