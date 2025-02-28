import { Link } from "react-router-dom";

import styles from "../../scss/components/SideNav.module.scss";

export default function SideNav() {
    const navlist = [
        {
            label: "홈",
            img: "/icon/dashboard.svg",
            alt: "홈 아이콘",
            path: "/home",
        },
        {
            label: "영화/드라마정보",
            img: "/icon/movie.svg",
            alt: "영화,드라마정보 아이콘",
            path: "/home/list",
        },
        {
            label: "다이어리",
            img: "/icon/diary.svg",
            alt: "다이어리 아이콘",
            path: "/home/diary",
        },
        {
            label: "고객센터",
            img: "/icon/service.svg",
            alt: "고객센터 아이콘",
            path: "/home/service",
        },
    ];
    return (
        <nav className={styles.wrapper}>
            <div className={styles.wrap}>
                <div className={styles.imgwrap}>
                    <div className={styles.logo}>
                        <img src="/main/logoB.svg" alt="로고" />
                    </div>
                </div>
                <div className={styles.content}>
                    <ul className={styles.lists}>
                        {navlist.map((item, idx) => (
                            <li className={styles.list} key={idx}>
                                <Link to={item.path} className={styles.item}>
                                    <img
                                        src={item.img}
                                        alt={item.alt}
                                        className={styles.icon}
                                    />
                                    <p className={styles.title}>{item.label}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
