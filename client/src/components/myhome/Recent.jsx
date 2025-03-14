import DiaryListForm from "../diary/DiaryListForm";
import "../../scss/DiaryListForm.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useDiaryStore from "../../store/useDiaryStore";
export default function Recent() {
    const { diaryData, filteredData, filterDiaryData, setBookmarkTab } =
        useDiaryStore();

    useEffect(() => {
        setBookmarkTab(false); //마지막 북마크페이지 데이터표시 방지
        filterDiaryData();
        console.log("최근업데이트하나");
    }, [diaryData]);

    //빈배열방지
    if (!filteredData || filteredData.length === 0) {
        return <p></p>;
    }

    return (
        <div className="recentWrapper">
            <div className="headerWrap">
                <h1>최근 기록한 다이어리</h1>
                <Link to="diary">MORE</Link>
            </div>

            <DiaryListForm limit={3} />
        </div>
    );
}
