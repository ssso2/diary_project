import { Link } from "react-router-dom";

import styles from "../../scss/components/Banner.module.scss";

// import "../scss/common.scss";

export default function Banner() {
    return (
        <section className={styles.MainBanner}>
            <img src="/main/main1.svg" alt="메인이미지" />
            <div className={styles.content}>
                <p className={styles.title}>
                    내가 감상한 영화에 대한 감정과 기록을 한번에
                </p>
                <div className={styles.subtitle}>
                    <p>영화 다이어리</p>
                    <div>
                        <span className={styles.scenetxt}>씬</span>
                        <span>-기록</span>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <Link to="/join" className={styles.btn}>
                        회원가입
                    </Link>
                    <Link to="/login" className={styles.btn}>
                        로그인
                    </Link>
                </div>
            </div>

            <div className={styles.scroll}>
                <img src="/icon/mouse.svg" alt="mouse" />
                <img src="/icon/down.svg" alt="arrowbottom" />
            </div>
        </section>
    );
}
