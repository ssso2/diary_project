import { Link } from "react-router-dom";

import styles from "../../scss/components/JoinSuccess.module.scss";

export default function JoinSuccess() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <img
                    src="/icon/checkmark.svg"
                    alt="회원가입 성공 체크 아이콘"
                    className={styles.checkmark}
                />
                <p className={styles.successMessage}>
                    회원가입이 완료되었습니다.
                </p>
                <p className={styles.infoMessage}>
                    로그인 후 씬-기록 서비스를 이용해보세요.
                </p>
                <div className={styles.loginBtn}>
                    <Link to="/login">로그인하기</Link>
                </div>
            </div>
        </div>
    );
}
