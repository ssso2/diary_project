import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/Validation";
import { LoginInput } from "../../components/common/LoginInput";

// import styles from "../../scss/components/Email.module.scss";
import styles from "../../scss/components/FindpwForm.module.scss";
import { useAuth } from "../../components/login/AuthContext";
import { ErrorMessage } from "../../components/common/Common";

export default function Pwchk() {
    const [pw, setpw] = useState("");
    const { user, PwchkGo } = useAuth();
    const [errors, seterrors] = useState("");
    const pwchange = e => {
        setpw(e.target.value);
        seterrors(""); // 에러초기화
    };

    const pwchk = async e => {
        e.preventDefault();

        if (!validatePassword(pw)) {
            seterrors("영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)");
            return;
        }

        PwchkGo(user.id, pw);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>본인확인</h1>
            <p className={styles.subtitle}>
                회원님의 정보를 보호하기 위해 비밀번호를 입력해주세요.
            </p>
            <form className={styles.joinForm} onSubmit={pwchk}>
                <LoginInput
                    name="비밀번호"
                    id="pw"
                    type="password"
                    value={pw}
                    placeholder="비밀번호를 입력하세요."
                    onChange={pwchange}
                />
                <ErrorMessage message={errors} />

                <button
                    type="submit"
                    disabled={!pw}
                    className={`${styles.btnSubmit} ${
                        !pw ? styles.disabled : ""
                    }`}
                    title="확인"
                >
                    확인
                </button>
            </form>
        </div>
    );
}
