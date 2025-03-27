import { useState } from "react";
import styles from "../../scss/components/FindpwForm.module.scss";
import FindPw from "./FindPw";
import { useAuth } from "./AuthContext";

export default function FindpwForm({ setPwCheckSuccess, email, setemail }) {
    const [name, setname] = useState("");
    // const [email, setemail] = useState("");
    const [codeVerify, setcodeVerify] = useState(false);
    const [pw, setpw] = useState("");
    const [pwchk, setpwchk] = useState("");
    const [agree, setagree] = useState(false);
    const [errors, seterrors] = useState({
        name: "",
        pw: "",
        pwchk: "",
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>비밀번호 찾기</h1>
            <p className={styles.subtitle}>
                비밀번호를 확인할 이메일 주소를 입력해주세요.
            </p>
            <form className={styles.joinForm}>
                <FindPw />
            </form>
        </div>
    );
}
