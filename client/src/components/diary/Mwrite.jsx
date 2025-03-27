import { useState } from "react";
import styles from "../../scss/components/DiaryDetail.module.scss";
import Datepicker from "./Datepicker";
import EmotionSelector from "./EmotionSelector";
import StarReview from "./StarReview";
import TinyForm from "./TinyForm";
import { minimalGenres } from "../list/genres";
import Radio from "../common/Radio";
import Select from "../common/Select";
import Input from "../common/Input";
import Thumbnail from "./Thumbnail";
import { formatDate } from "../../utils/Validation";

export default function Mwrite({
    day,
    setDay,
    rate,
    setRate,
    setFile,
    setPosterThumbnail,
    formData,
    changeValue,
    content,
    setContent,
    imgs,
    setImgs,
    editorRef,
}) {
    //관람일
    const [calendar, setCalendar] = useState(false);
    // console.log("날짜", day);
    //썸네일
    const [selectedOption, setSelectedOption] = useState("poster");
    const selectLists = [
        { id: "poster", label: "영화포스터 불러오기" },
        { id: "image", label: "이미지 등록" },
    ];
    //미리보기
    const [preview, setPreview] = useState(null);

    return (
        <div className={styles.container}>
            <p className={styles.mTitle}>장르</p>
            <Select
                name="genre"
                value={formData.genre}
                onChange={changeValue}
                options={minimalGenres}
            />
            <p className={styles.mTitle}>제목</p>
            <Input
                placeholder="제목을 입력해주세요."
                name="title"
                value={formData.title}
                onChange={changeValue}
            />
            <section>
                <h3 className={styles.td}>감상평</h3>

                <TinyForm
                    content={content}
                    setContent={setContent}
                    imgs={imgs}
                    setImgs={setImgs}
                    editorRef={editorRef}
                />
            </section>
            <section>
                <h3 className={styles.td}>썸네일</h3>

                <Radio
                    name="thumbnail"
                    options={selectLists}
                    selected={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
                <Thumbnail
                    selectedOption={selectedOption}
                    setPreview={setPreview}
                    setFile={setFile}
                    setPosterThumbnail={setPosterThumbnail}
                />
            </section>
            {preview && (
                <section>
                    <h3 className={styles.td}>영화정보</h3>

                    <div className={styles.posterWrap}>
                        <img src={preview} className={styles.poster} />
                    </div>
                </section>
            )}

            <section>
                <h3 className={styles.td}>관람일</h3>

                <div className={styles.daywrap}>
                    <button type="button" onClick={() => setCalendar(true)}>
                        <img src="/icon/today.svg" alt="관람일" title="달력" />
                    </button>
                    {formatDate(day)}
                </div>
                {calendar ? (
                    <Datepicker
                        setCalendar={setCalendar}
                        day={day}
                        setDay={setDay}
                    />
                ) : null}
            </section>
            <section>
                <h3 className={styles.td}>평점</h3>

                <StarReview rate={rate} setRate={setRate} />
            </section>
            <section>
                <h3 className={styles.td}>감상전</h3>

                <EmotionSelector
                    category="before"
                    formData={formData}
                    changeValue={changeValue}
                />
            </section>
            <section>
                <h3 className={styles.td}>감상후</h3>

                <EmotionSelector
                    category="after"
                    formData={formData}
                    changeValue={changeValue}
                />
            </section>
        </div>
    );
}
