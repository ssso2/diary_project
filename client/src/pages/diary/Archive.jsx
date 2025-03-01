import styles from "../../scss/components/DiaryListForm.module.scss";

export default function Archive() {
    return (
        <div className={styles.diarywrapper}>
            <div className={styles.poster}>
                <img src="/sub/poster.png" alt="" />
            </div>
            <div className={styles.info}>
                <p className={styles.title}>패딩턴</p>
                <div className={styles.emotionwrap}>
                    <div className={styles.emotion}>
                        <p className={styles.txt}>감상 전</p>
                        <img src="/icon/sad.svg" alt="" />
                    </div>
                    <div className={styles.emotion}>
                        <p className={styles.txt}>감상 후</p>
                        <img src="/icon/happy.svg" alt="" />
                    </div>
                </div>
                <p className={styles.review}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing Natus in
                    modi, sit magnam quis accusantium!
                </p>
                <div className={styles.optiponwrap}>
                    <div className={styles.option}>
                        <img src="/icon/calendar.svg" alt="" />
                        <p className={styles.txt}>2025.01.30</p>
                    </div>
                    <div className={styles.option}>
                        <img src="/icon/star.svg" alt="" />
                        <p className={styles.txt}>5.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
