import styles from "../../scss/components/Detail.module.scss";

export default function DeatilEmotion({ diary }) {
    return (
        <section className={styles.emotionWrapper}>
            <div>
                <h2 className={styles.emtionTitle}>영화 보기 전 내 감정과</h2>
                <h2 className={styles.emtionTitle}>
                    영화 본 후 내 감정은 어떻게 변했을까?
                </h2>
            </div>

            <div className={styles.emotionWrap}>
                <div className={styles.emotion}>
                    <p>감상 전</p>

                    <img
                        src={`/icon/${diary.before_emotion}.svg`}
                        alt={`감상 전 감정: ${diary.before_emotion}`}
                    />
                </div>
                <div className={styles.emotion}>
                    <p>감상 후</p>
                    <img
                        src={`/icon/${diary.after_emotion}.svg`}
                        alt={`감상 후 감정: ${diary.after_emotion}`}
                    />
                </div>
            </div>
        </section>
    );
}
