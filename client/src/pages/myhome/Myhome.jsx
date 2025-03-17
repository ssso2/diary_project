import { useEffect, useState } from "react";
import MyCalendar from "../../components/myhome/MyCalendar";
import Recent from "../../components/myhome/Recent";
import useDiaryStore from "../../store/useDiaryStore";
import { useAuth } from "../../components/login/AuthContext";

export default function Myhome() {
    const { fetchDiaryData, diaryData, updateDiaries } = useDiaryStore();
    const { user } = useAuth();
    const [fetch, setFetch] = useState(false);

    //수정
    useEffect(() => {
        if (!fetch && user?.id) {
            // 최초 1회만 호출
            setFetch(true);
            fetchDiaryData(user.id);
        }
    }, [fetch, user?.id]);

    useEffect(() => {
        if (
            Array.isArray(diaryData) &&
            diaryData.some(diary => diary.changed) //true반환
        ) {
            updateDiaries(user.id);
        }
    }, [diaryData]);

    //기존
    // useEffect(() => {
    //     if (diaryData.length === 0) {
    //         console.log("다이어리홈");
    //         fetchDiaryData(user.id);
    //     } else if (
    //         Array.isArray(diaryData) &&
    //         diaryData.some(diary => diary.changed) //true반환
    //     ) {
    //         updateDiaries(user.id);
    //     }
    // }, [diaryData, diaryData.length]);

    return (
        <main className="homeContainer">
            <MyCalendar />
            <Recent />
        </main>
    );
}
