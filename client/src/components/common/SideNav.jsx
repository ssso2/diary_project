import { Link, useLocation } from "react-router-dom";

import styles from "../../scss/components/SideNav.module.scss";

export default function SideNav() {
    const location = useLocation();
    //경로찾기
    const Active = (current, base) => {
        if (base === "/home") {
            return current === "/home"; // 정확히 /home일 때만 활성화
        }
        if (base === "/home/diary") {
            return (
                current.startsWith("/home/diary") ||
                current.startsWith("/home/write") ||
                current.startsWith("/home/detail")
            );
        }
        return current.startsWith(base);
    };

    const navlist = [
        {
            id: "home",
            label: "캘린더",
            img: "/icon/dashboard.svg",
            alt: "홈 아이콘",
            path: "/home",
        },
        {
            id: "movie",
            label: "최신영화정보",
            img: "/icon/movie.svg",
            alt: "영화정보 아이콘",
            path: "/home/list",
        },
        {
            id: "diary",
            label: "다이어리",
            img: "/icon/diary.svg",
            alt: "다이어리 아이콘",
            path: "/home/diary",
        },
        {
            id: "stats",
            label: "통계",
            img: "/icon/chart.svg",
            alt: "통계 아이콘",
            path: "/home/stats",
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
                        {navlist.map((item, idx) => {
                            const ActiveItem = Active(
                                location.pathname,
                                item.path
                            );
                            return (
                                <li className={styles.list} key={idx}>
                                    <Link
                                        to={item.path}
                                        className={`${styles[item.id]} ${
                                            ActiveItem ? styles.active : ""
                                        }`}
                                    >
                                        {/* <li className={styles.list} key={idx}>
                                <Link
                                    to={item.path}
                                    className={styles[`${item.id}`]}
                                > */}
                                        <span className={styles.item}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
