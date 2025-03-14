import { useRef, useState } from "react";
import styles from "../../scss/components/Detail.module.scss";
import { formatDate } from "../../utils/Validation";
import DetailModal from "./DetailModal";

export default function DetailHeader({ diary }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const [modal, setModal] = useState(false);
    const modalRef = useRef(null);
    return (
        <header className={styles.header}>
            <p className={styles.genre}>{diary.genre}</p>
            <h1 className={styles.title}>{diary.title}</h1>
            <div className={styles.infoWrapper}>
                <div className={styles.infoWrap}>
                    <div className={styles.info}>
                        <img src="/icon/calendar.svg" alt="달력 아이콘" />
                        <time
                            dateTime={formatDate(diary.date)}
                            className={styles.txt}
                        >
                            {formatDate(diary.date)}
                        </time>
                    </div>
                    <div className={styles.info}>
                        <img src="/icon/starFill.svg" alt="별점 아이콘" />
                        <span className={styles.txt}> 5</span>
                    </div>
                </div>
                <div className={styles.more}>
                    <button
                        type="button"
                        ref={modalRef}
                        onClick={() => {
                            setModal(true);
                            console.log("버튼클릭");
                        }}
                    >
                        <img src="/icon/more.svg" alt="수정삭제" />
                    </button>
                </div>
                {modal && (
                    <DetailModal
                        modal={modal}
                        setModal={setModal}
                        targetref={modalRef}
                    />
                )}
            </div>
            <figure className={styles.thumbnail}>
                {diary.thumbnail && diary.thumbnail.startsWith("http") ? (
                    <img src={diary.thumbnail} alt={`${diary.title}포스터`} />
                ) : (
                    <img
                        src={`${URL}/imgs/diary/${diary.thumbnail}`}
                        alt="기본썸네일"
                    />
                )}
            </figure>
        </header>
    );
}
