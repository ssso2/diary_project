import { Link, useLocation } from "react-router-dom";
import styles from "../../scss/components/JoinSuccess.module.scss";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function PwSuccess() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <img
                    src="/icon/checkmark.svg"
                    alt="비밀번호 변경 성공 체크 아이콘"
                    className={styles.checkmark}
                />
                <p className={styles.successMessage}>
                    비밀번호 변경이 완료되었습니다.
                </p>
                <p className={styles.infoMessage}>
                    새로운 비밀번호로 로그인해주세요.
                </p>
                <div className={styles.loginBtn}>
                    <Link to="/login">로그인하기</Link>
                </div>
            </div>
        </div>
    );
}
