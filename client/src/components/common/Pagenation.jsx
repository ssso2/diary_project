import styles from "../../scss/components/Pagenation.module.scss";
export default function Pagenation({
    allmovies,
    currentPage,
    pageChange,
    PerPage,
    totalPage,
}) {
    const pageClick = index => {
        if (index < 1 || index > totalPage) return;
        pageChange(index);
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.btn}
                onClick={() => pageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <img src="/icon/left.svg" alt="이전" title="이전으로" />
            </button>
            {Array(totalPage)
                .fill()
                .map((_, index) => (
                    <button
                        key={index + 1}
                        className={`${styles.index} ${
                            currentPage === index + 1 ? styles.active : ""
                        }`}
                        onClick={() => pageClick(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            {/* <span className="index">{currentPage}</span> */}
            <button
                className={styles.btn}
                onClick={() => pageClick(currentPage + 1)}
                disabled={currentPage === totalPage}
            >
                <img src="/icon/right.svg" alt="이전" title="다음으로" />
            </button>
        </div>
    );
}
