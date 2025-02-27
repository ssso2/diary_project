import styles from "../scss/components/HomeMain.module.scss";
export default function HomeMain() {
    return (
        <section className="wrapper">
            <div className={styles.wrap}>
                <div className={styles.textWrap}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quae magnam vero,
                    </p>
                    <p>
                        esse officia dicta cum officiis odio adipisci dolores
                        incidunt omnis consequuntur
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
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Culpa quam officia repellat illum eveniet?
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
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Aliquam adipisci,
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
