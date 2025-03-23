import { Link } from "react-router-dom";
import styles from "../../scss/components/Footer.module.scss";

export default function Footer() {
    const footerLinks = [
        { label: "서비스 이용약관", path: "/#" },
        { label: "개인정보처리방침", path: "/#" },
        { label: "공지사항", path: "/#" },
        { label: "자주묻는질문", path: "/#" },
    ];

    return (
        <footer className={styles.footer}>
            <nav className={styles.nav}>
                {/* <ul className={styles.links}>
                    {footerLinks.map((link, index) => (
                        <li key={index} className={styles.linkList}>
                            <Link to={link.path}>{link.label}</Link>
                        </li>
                    ))}
                </ul> */}
                <div className={styles.info}>
                    <img
                        src="/main/logoB.svg"
                        alt="기록로고"
                        className={styles.logo}
                    />

                    <Link
                        to="https://github.com/ssso2"
                        className={styles.links}
                    >
                        <span>View on GitHub</span>
                        <img
                            src="/icon/link.svg"
                            alt="깃허브링크"
                            title="깃허브로 이동"
                        />
                    </Link>

                    <p className={styles.contact}>문의 : kpong358@gmail.com</p>

                    <p className={styles.description}>
                        개인프로젝트로 운영되는 비상업적 서비스입니다.
                    </p>
                </div>
                <p className={styles.copyright}>
                    © 2025 SceneLog | All rights reserved.
                </p>
            </nav>
        </footer>
    );
}
