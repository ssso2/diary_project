import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../scss/components/Header.module.scss";
import HeaderB from "./HeaderB";

export default function Header() {
    const [headerBg, setheaderBg] = useState(false);
    const [headerHide, setheaderHide] = useState(false);
    const [lastY, setlastY] = useState(0);
    const [open, setOPen] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth <= 767);

    // 반응형대응
    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const headershow = () => {
            const topY = window.scrollY;
            // console.log("스크롤", topY);
            if (topY > lastY && lastY > 0) {
                setheaderHide(true);
            } else {
                setheaderHide(false);
            }
            setlastY(topY);
            if (topY > 80 && !headerBg) {
                setheaderBg(true);
            } else if (topY <= 80 && headerBg) {
                setheaderBg(false);
            }
        };
        window.addEventListener("scroll", headershow);
        return () => {
            window.removeEventListener("scroll", headershow);
        };
    }, [lastY, headerBg]);

    return mobile ? (
        <HeaderB />
    ) : (
        <header
            className={`${styles.header} ${headerBg ? styles.scrolled : ""} ${
                headerHide ? styles.none : ""
            }`}
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
