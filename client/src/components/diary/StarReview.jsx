import { useState } from "react";
import styles from "../../scss/components/StarReview.module.scss";

export default function StarReview({ rate, setRate }) {
    // const [rate, setrate] = useState(0);
    const [hover, sethover] = useState(0);
    const stars = [1, 2, 3, 4, 5];
    const starClick = star => {
        //api 추가
        setRate(star);
    };

    return (
        <div className={styles.container}>
            {stars.map((star, idx) => (
                <span
                    key={idx}
                    onClick={() => starClick(star)}
                    className={styles.wrap}
                    onMouseEnter={() => sethover(star)}
                    onMouseLeave={() => sethover(0)}
                >
                    <img
                        src={
                            star <= (hover || rate)
                                ? "/icon/starFill.svg"
                                : "/icon/starEmpty.svg"
                        }
                        alt={`별점${star}`}
                        className={styles.img}
                    />
                </span>
            ))}
        </div>
    );
}
