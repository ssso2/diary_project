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
                <ul className={styles.links}>
                    {footerLinks.map((link, index) => (
                        <li key={index} className={styles.linkList}>
                            <Link to={link.path}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className={styles.info}>
                    <img
                        src="/main/logoB.svg"
                        alt="기록로고"
                        className={styles.logo}
                    />
                    <p className={styles.contact}>문의 :</p>
                    <p className={styles.description}>
                        개인프로젝트로 운영되는 비상업적 서비스입니다.
                    </p>
                </div>
                <p className={styles.copyright}>
                    © 2025 log. 감성을 기록하고 공유하는 커뮤니티.
                </p>
            </nav>
        </footer>
    );
}
