import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer,
} from "recharts";
import useDiaryStore from "../../store/useDiaryStore";
import { formatDate, formatNewDate } from "../../utils/Validation";
import CountUp from "./Countup";

export default function Summary() {
    const { diaryData } = useDiaryStore();
    // console.log("다이어리데이터오나", diaryData);

    const today = new Date();

    const thisMonthStr = formatNewDate(today).slice(0, 7); // "2025-03"
    const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1);
    const lastMonthStr = formatNewDate(lastMonthDate).slice(0, 7); // "2025-02"

    //반환배열 개수 = 데이터개수
    const thisMonthCount = diaryData.filter(diary =>
        formatDate(diary.date).startsWith(thisMonthStr)
    ).length;
    const lastMonthCount = diaryData.filter(diary =>
        formatDate(diary.date).startsWith(lastMonthStr)
    ).length;

    //정규화 비율
    const total = thisMonthCount + lastMonthCount;

    const thisMonthPercent = (thisMonthCount / total) * 100;
    const lastMonthPercent = (lastMonthCount / total) * 100;

    // console.log(thisMonthCount, lastMonthCount);
    const barData = [
        {
            name: "다이어리 기록 현황",
            이번달: thisMonthPercent,
            gap: 2,
            지난달: lastMonthPercent,
        },
    ];
    return (
        <>
            <ResponsiveContainer width="100%" height={48}>
                <BarChart
                    width={500}
                    height={48}
                    data={barData}
                    layout="vertical"
                >
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Bar
                        dataKey="이번달"
                        stackId="a"
                        fill="#FF7235"
                        radius={[4, 4, 4, 4]}
                    ></Bar>
                    <Bar dataKey="gap" stackId="a" fill="transparent"></Bar>

                    <Bar
                        dataKey="지난달"
                        stackId="a"
                        fill="#8F8F8F"
                        radius={[4, 4, 4, 4]}
                    ></Bar>
                </BarChart>
            </ResponsiveContainer>
            {/* 퍼센트 */}
            <div className="monthCompareWrapper">
                <CountUp target={thisMonthCount} />
                <CountUp target={lastMonthCount} />
            </div>
            <div className="statsBox">
                <div className="monthRow under">
                    <div className="monthInfo">
                        <div className="square orange"></div>
                        <p>이번달</p>
                    </div>
                    <div className="monthData">
                        <p>{thisMonthCount}개</p>
                        <p className="percent orangeBg">
                            {Math.round(thisMonthPercent)}%
                        </p>
                    </div>
                </div>

                <div className="monthRow">
                    <div className="monthInfo">
                        <div className="square gray"></div>
                        <p>지난달</p>
                    </div>
                    <div className="monthData">
                        <p>{lastMonthCount}개</p>
                        <p className="percent grayBg">
                            {Math.round(lastMonthPercent)}%
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
