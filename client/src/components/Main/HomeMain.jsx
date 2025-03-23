import styles from "../../scss/components/HomeMain.module.scss";

export default function HomeMain() {
    return (
        <section className="wrapper">
            <div className={styles.wrap}>
                <div className={styles.textWrap}>
                    <p>영화를 사랑하지만 시간이 흐르면 흐릿해지는 그 순간들.</p>
                    <p>
                        인상 깊은 장면과 마음을 울린 대사, 그리고 그날의
                        감정까지.
                    </p>
                    <p>
                        기억 속에서 사라지지 않도록, 지금 기록으로 남겨보세요.
                    </p>
                </div>

                <article className={styles.article}>
                    <div className={styles.imgWrap}>
                        <img
                            src="/main/main4.svg"
                            alt="다이어리 적고있는 모습"
                            className={styles.img}
                        />
                    </div>
                    <div className={styles.caption}>
                        <p className={styles.des}>장면기록, 감정까지</p>
                        <p className={styles.des}>씬-기록에서 한번에</p>
                        <p className={styles.description}>
                            단순한 감상문을 넘어서 영화가 머무른 하루의 감정과
                            <br />
                            당신만의 생각을 기록하고 간직하세요.
                        </p>
                    </div>
                </article>

                <div className={styles.flexContainer}>
                    <article className={styles.article}>
                        <div className={styles.imgWrap}>
                            <img
                                src="/main/main2.svg"
                                alt="노트북에서 이미지 찾는 모습"
                                className={styles.img}
                            />
                        </div>
                        <div className={styles.captionFlex}>
                            <p>단순한 감상이 아닌,</p>
                            <p className={styles.highlight}>&nbsp;감정</p>
                            <p>을</p>
                            <p className={styles.highlight}>&nbsp;기록</p>
                            <p>하는 공간.</p>
                        </div>
                    </article>

                    <article className={styles.article}>
                        <div className={styles.flexWrap}>
                            <div className={styles.smallImgWrap}>
                                <img
                                    src="/main/main3.svg"
                                    alt="노트북에서 이미지 찾는 모습"
                                    className={styles.smallImg}
                                />
                            </div>
                            <div className={styles.captionSmall}>
                                <p>
                                    넘쳐나는 콘텐츠 속에서 잊혀지는 소중한
                                    기억들을 <br /> 체계적으로 기록하고 관리할
                                    수 있는 서비스입니다.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
