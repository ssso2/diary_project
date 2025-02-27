import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../scss/components/Header.module.scss";

export default function Header() {
    const [headerBg, setheaderBg] = useState(false);

    useEffect(() => {
        const headershow = () => {
            const y = window.scrollY;
            console.log("스크롤", y);
            if (y > 80) {
                setheaderBg(true);
            } else setheaderBg(false);
        };
        window.addEventListener("scroll", headershow);
        return () => {
            window.removeEventListener("scroll", headershow);
        };
    }, []);

    return (
        <header
            className={`${styles.header} ${headerBg ? styles.scrolled : ""}`}
        >
            <nav className={styles.nav}>
                <Link to="/">
                    <img
                        src="/main/logo.svg"
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
