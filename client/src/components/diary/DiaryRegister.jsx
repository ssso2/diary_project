import styles from "../../scss/components/DiaryDetail.module.scss";
import EmotionSelector from "./EmotionSelector";
import StarReview from "./StarReview";

export default function DiaryRegister() {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <tr>
                    <td>영화정보</td>
                    <td>
                        <input
                            type="text"
                            placeholder="영화정보를 불러와주세요."
                            readonly
                        ></input>
                        <button className={styles.searchBtn}>
                            영화정보 불러오기
                        </button>
                    </td>
                </tr>
                <tr>
                    <td className={styles.td}>내용</td>
                    <td className={styles.tdd}>
                        <input type="textarea" />
                    </td>
                </tr>
                <tr>
                    <td>관람일</td>
                    <td>ㅇㅇㅇㅇ</td>
                </tr>
                <tr>
                    <td>평점</td>
                    <td>
                        <StarReview />
                    </td>
                </tr>

                <tr>
                    <td>감상전</td>
                    <td>
                        <EmotionSelector category="before" />
                    </td>
                </tr>
                <tr>
                    <td>감상후</td>
                    <td>
                        {" "}
                        <EmotionSelector category="after" />
                    </td>
                </tr>
            </table>
            <button className={styles.submitBtn}>취소</button>
            <button className={styles.submitBtn}>저장</button>
        </div>
    );
}
