import { useState } from "react";
import { validatePassword } from "../../utils/Validation";
import { LoginInput } from "../../components/common/LoginInput";
import styles from "../../scss/components/FindpwForm.module.scss";
import { useAuth } from "../../components/login/AuthContext";
import { ErrorMessage } from "../../components/common/Common";

export default function Pwchange() {
    const { user, pw, setpw, pwchk, setpwchk, PwUpdateGo } = useAuth();
    const [errors, seterrors] = useState({
        pw: "",
        pwchk: "",
    });
    // 이메일 입력 시 유효성 체크
    // const pwchange = e => {
    //     setpw(e.target.value);
    //     seterrors("");
    // };

    // 입력 변경 시 에러 메시지 초기화
    const Change = (setter, value, key) => {
        setter(value);
        seterrors(prev => ({ ...prev, [key]: "" }));
    };

    // // 로그인 버튼 클릭 시 유효성 검사 실행
    const pwTwochk = async e => {
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

        PwUpdateGo(user.id, pw);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>개인정보</h1>

            <form className={styles.joinForm} onSubmit={pwTwochk}>
                <p className="emailTitle">이메일</p>
                <input
                    type="text"
                    value={user.user_id}
                    className="input fill"
                    readOnly
                />

                {/* </input> */}
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
                    title="비밀번호 변경"
                >
                    비밀번호 변경
                </button>
            </form>
        </div>
    );
}
