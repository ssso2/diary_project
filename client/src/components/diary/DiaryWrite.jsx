import { useState } from "react";
import styles from "../../scss/components/DiaryDetail.module.scss";
import Datepicker from "./Datepicker";
import EmotionSelector from "./EmotionSelector";
import StarReview from "./StarReview";
import TinyForm from "./TinyForm";

export default function DiaryWrite({
    day,
    setDay,
    rate,
    setRate,
    formData,
    changeValue,
}) {
    // const [day, setDay] = useState(new Date());
    const URL = process.env.REACT_APP_BACK_URL;
    const [calendar, setCalendar] = useState(false);

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
                            name="title"
                            value={formData.title}
                            onChange={changeValue}
                        ></input>
                        <button className={styles.searchBtn}>
                            영화정보 불러오기
                        </button>
                    </td>
                </tr>
                <tr>
                    <td className={styles.td}>내용</td>
                    <TinyForm />
                </tr>
                <tr>
                    <td>관람일</td>
                    <td>
                        {day && day.toISOString().split("T")[0]}

                        <button onClick={() => setCalendar(true)}>
                            <img src="/icon/today.svg" />
                        </button>
                        {calendar ? (
                            <Datepicker
                                setCalendar={setCalendar}
                                day={day}
                                setDay={setDay}
                            />
                        ) : null}
                    </td>
                </tr>
                <tr>
                    <td>평점</td>
                    <td>
                        <StarReview rate={rate} setRate={setRate} />
                    </td>
                </tr>

                <tr>
                    <td>감상전</td>
                    <td>
                        <EmotionSelector
                            category="before"
                            formData={formData}
                            changeValue={changeValue}
                        />
                    </td>
                </tr>
                <tr>
                    <td>감상후</td>
                    <td>
                        {" "}
                        <EmotionSelector
                            category="after"
                            formData={formData}
                            changeValue={changeValue}
                        />
                    </td>
                </tr>
            </table>
        </div>
    );
}
