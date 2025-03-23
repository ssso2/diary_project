import { Link } from "react-router-dom";
import styles from "../../scss/components/Detail.module.scss";

export default function DetailNav({ diaryData, diary }) {
    const sorted = [
        ...diaryData.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        }),
    ];
    const currentIndex = sorted.findIndex(item => item.id === diary.id); //다이어리 삭제대비 배열에서의 순서로 찾기
    const prev = currentIndex > 0 ? diaryData[currentIndex - 1] : null;
    const next =
        currentIndex < diaryData.length ? diaryData[currentIndex + 1] : null;
    console.log(diary, diary.id, "지금아이디", prev);
    return (
        <nav className={styles.navWrapper}>
            {prev ? (
                <Link to={`/home/detail/${prev.id}`} className={styles.navWrap}>
                    <div className={styles.nav}>
                        <img src="/icon/prev.svg" alt="이전글" />
                    </div>
                    <span>{prev.title}</span>
                </Link>
            ) : (
                <p className={styles.noneNav}>마지막 다이어리입니다.</p>
            )}
            {next ? (
                <Link to={`/home/detail/${next.id}`} className={styles.navWrap}>
                    <div className={styles.nav}>
                        <img src="/icon/navnext.svg" alt="다음글" />
                    </div>
                    <span>{next.title}</span>
                </Link>
            ) : (
                <p className={styles.noneNav}>첫 다이어리입니다.</p>
            )}
        </nav>
    );
}
