import { useEffect } from "react";
import Chart from "../../components/stats/Chart.jsx";
import Emotion from "../../components/stats/Emotion";
import { useEmotionData } from "../../components/stats/EmotionData.jsx";
import StatsSection from "../../components/stats/StatsSection";
import Summary from "../../components/stats/Summary";
import Thumbnail from "../../components/stats/Thumbnail";
import "../../scss/components/Stats.scss";
import useDiaryStore from "../../store/useDiaryStore.jsx";
import { useAuth } from "../../components/login/AuthContext.jsx";

export default function Status() {
    const { beforeData, afterData } = useEmotionData();
    const { user } = useAuth();
    const { fetchDiaryData } = useDiaryStore();
    useEffect(() => {
        if (user) {
            fetchDiaryData(user.id);
        }
    }, [user]);
    return (
        <>
            <div className="statsContainer gap">
                <StatsSection title="다이어리 기록 현황">
                    <Summary />
                </StatsSection>
                <StatsSection title="연간 다이어리 등록 현황">
                    <Chart />
                </StatsSection>
                <StatsSection title="썸네일유형">
                    <Thumbnail />
                </StatsSection>
            </div>
            <div className="statsContainer">
                <StatsSection title="영화감상 전 감정 비율">
                    <Emotion data={beforeData} />
                </StatsSection>
                <StatsSection title="영화감상 후 감정 비율">
                    <Emotion data={afterData} />
                </StatsSection>
            </div>
        </>
    );
}
