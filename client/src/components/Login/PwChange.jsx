import { useState } from "react";
import { validatePassword } from "../../utils/Validation";
import { ErrorMessage } from "../common/Common";
import { LoginInput } from "../common/LoginInput";
import styles from "../../scss/components/FindpwForm.module.scss";
import { useAuth } from "./AuthContext";

export default function PwChange() {
    const { email, pw, setpw, pwchk, setpwchk, findGo } = useAuth();

    const [errors, seterrors] = useState({
        pw: "",
        pwchk: "",
    });

    // 입력 변경 시 에러 메시지 초기화
    const Change = (setter, value, key) => {
        setter(value);
        seterrors(prev => ({ ...prev, [key]: "" }));
    };

    // 회원가입 버튼 클릭 시 유효성 검사 실행
    const loginchk = async e => {
        e.preventDefault();
        let errorMessages = {};

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
        findGo(email, pw);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>비밀번호 재설정</h1>
            <p className={styles.subtitle}>
                비밀번호 재설정을 위한 인증이 완료되었습니다.
            </p>
            <p className={styles.subtitle}>새로운 비밀번호를 입력해주세요.</p>
            <form onSubmit={loginchk} className={styles.joinForm}>
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
                    onChange={e => Change(setpwchk, e.target.value, "pwchk")}
                />
                <ErrorMessage message={errors.pwchk} />
                <button
                    type="submit"
                    disabled={!(pw && pwchk)}
                    className={`${styles.btnSubmit} ${
                        !(pw && pwchk) ? styles.disabled : ""
                    }`}
                >
                    비밀번호 변경하기
                </button>
            </form>
        </div>
    );
}
