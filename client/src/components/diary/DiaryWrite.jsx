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

export default function DiaryWrite({
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
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td>장르</td>
                        <td>
                            <Select
                                name="genre"
                                value={formData.genre}
                                onChange={changeValue}
                                options={minimalGenres}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td>
                            <Input
                                placeholder="제목을 입력해주세요."
                                name="title"
                                value={formData.title}
                                onChange={changeValue}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.td}>감상평</td>
                        <td>
                            <TinyForm
                                content={content}
                                setContent={setContent}
                                imgs={imgs}
                                setImgs={setImgs}
                                editorRef={editorRef}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.td}>썸네일</td>
                        <td>
                            <Radio
                                name="thumbnail"
                                options={selectLists}
                                selected={selectedOption}
                                setSelectedOption={setSelectedOption}
                            />
                            <Thumbnail
                                selectedOption={selectedOption}
                                // changeValue={changeValue}
                                setPreview={setPreview}
                                setFile={setFile}
                                setPosterThumbnail={setPosterThumbnail}
                            />
                        </td>
                    </tr>
                    {preview && (
                        <tr>
                            <td className={styles.td}>영화정보</td>
                            <td>
                                <div className={styles.posterWrap}>
                                    <img
                                        src={preview}
                                        className={styles.poster}
                                    />
                                </div>
                            </td>
                        </tr>
                    )}

                    <tr>
                        <td>관람일</td>
                        <td>
                            <div className={styles.daywrap}>
                                <button
                                    type="button"
                                    onClick={() => setCalendar(true)}
                                >
                                    <img
                                        src="/icon/today.svg"
                                        alt="관람일"
                                        title="달력"
                                    />
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
                </tbody>
            </table>
        </div>
    );
}
