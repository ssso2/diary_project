import Chart from "../../components/stats/Chart.jsx";
import Emotion from "../../components/stats/Emotion";
import StatsSection from "../../components/stats/StatsSection";
import Summary from "../../components/stats/Summary";
import Thumbnail from "../../components/stats/Thumbnail";
import "../../scss/components/Stats.scss";

export default function Status() {
    return (
        <div className="statsContainer">
            <StatsSection title="다이어리 기록 현황">
                <Summary />
            </StatsSection>
            <StatsSection title="연간 다이어리 등록 현황">
                <Chart />
            </StatsSection>
            <StatsSection title="썸네일유형">
                <Thumbnail />
            </StatsSection>
            <StatsSection title="영화감상 전 감정 비율">
                <Emotion />
            </StatsSection>
            <StatsSection title="영화감상 후 감정 비율">
                <Emotion />
            </StatsSection>
        </div>
    );
}
