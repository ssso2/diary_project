import { useEffect } from "react";
import MyCalendar from "../../components/myhome/MyCalendar";
import Recent from "../../components/myhome/Recent";
import useDiaryStore from "../../store/useDiaryStore";

export default function Myhome() {
    const { fetchDiaryData, diaryData, updateDiaries } = useDiaryStore();

    useEffect(() => {
        if (diaryData.length === 0) {
            console.log("수정다이어리서버시도");
            fetchDiaryData(9);
        } else if (
            Array.isArray(diaryData) &&
            diaryData.some(diary => diary.changed)
        ) {
            updateDiaries();
        }
    }, [diaryData.length]);

    return (
        <main className="homeContainer">
            <MyCalendar />
            <Recent />
        </main>
    );
}
