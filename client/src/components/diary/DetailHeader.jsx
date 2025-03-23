import { useEffect, useRef, useState } from "react";
import styles from "../../scss/components/Detail.module.scss";
import { formatDate } from "../../utils/Validation";
import DetailModal from "./DetailModal";

export default function DetailHeader({ diary }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = e => {
            if (!dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

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
                <div ref={dropdownRef}>
                    <div className={styles.more}>
                        <button type="button" onClick={() => setOpen(!open)}>
                            <img
                                src="/icon/more.svg"
                                alt="수정삭제"
                                title="옵션메뉴"
                            />
                        </button>
                        {open && <DetailModal open={open} setOpen={setOpen} />}
                    </div>
                </div>
                {/* {open && (
                    <DetailModal
                        open={open}
                        setOpen={setOpen}
                        // targetref={modalRef}
                    />
                )} */}
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
