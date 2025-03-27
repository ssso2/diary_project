import { Link } from "react-router-dom";
import styles from "../../scss/components/Header.module.scss";

export default function HeaderB() {
    return (
        <header className={`${styles.header} ${styles.headerB}`}>
            <nav className={styles.nav}>
                <Link to="/">
                    <img
                        src="/main/logoB.svg"
                        alt="로고"
                        className={styles.logo}
                    />
                </Link>
                <Link to="/login" className={styles.login}>
                    로그인 / 회원가입
                </Link>
            </nav>
        </header>
    );
}
