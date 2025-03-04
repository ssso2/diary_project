import styles from "../../scss/components/DiaryDetail.module.scss";
import EmotionSelector from "./EmotionSelector";

export default function DiaryRegister() {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <tr>
                    <td className={styles.td}>내용</td>
                    <td className={styles.tdd}>
                        <input type="text" />
                    </td>
                </tr>
                <tr>
                    <td>관람일</td>
                    <td>ㅇㅇㅇㅇ</td>
                </tr>
                <tr>
                    <td>평점</td>
                    <td>ㅇㅇㅇㅇ</td>
                </tr>
                <tr>
                    <td>영화정보</td>
                    <td>
                        <button className={styles.searchBtn}>
                            영화정보 불러오기
                        </button>
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
            <button className={styles.submitBtn}>저장</button>
        </div>
    );
}
