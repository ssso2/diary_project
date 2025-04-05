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
    const roundedPercent = Math.round(thisMonthPercent);
    // const late = thisMonthPercent - lastMonthPercent;
    let message = "";

    if (thisMonthCount > lastMonthCount) {
        message = (
            <p>
                <span className="last">지난달</span>
                <span>에 비해</span> <span className="this">이번달</span>{" "}
                <span>다이어리 작성 비중이 </span>
                <span className="percent">{roundedPercent}%</span>
                <span>로 늘었어요</span>
            </p>
        );
    } else if (thisMonthCount < lastMonthCount) {
        message = (
            <p>
                <span className="last">지난달</span>
                <span>에 비해</span> <span className="this">이번달</span>{" "}
                <span>다이어리 작성 비중이 </span>
                <span className="percent">{roundedPercent}%</span>
                <span>로 줄었어요</span>
            </p>
        );
    } else {
        message = (
            <p>
                <span className="last">지난달</span>
                <span>과</span> <span className="this">이번달</span>{" "}
                <span>다이어리 작성 비중에 </span>
                <span>변화가 없어요</span>
            </p>
        );
    }

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
            <div className="statsBox">
                <div className="chartComment">{message}</div>
            </div>
            <ResponsiveContainer width="100%" height={48}>
                <BarChart
                    width={500}
                    height={48}
                    data={barData}
                    layout="vertical"
                    // barCategoryGap={2}
                    barCategoryGap={8}
                    barGap={4}
                >
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Bar
                        dataKey="이번달"
                        stackId="a"
                        fill="#FF7235"
                        radius={[4, 4, 4, 4]}
                    ></Bar>

                    {/* 누적합산 오류수정 */}
                    {/* <Bar dataKey="gap" stackId="a" fill="transparent"></Bar> */}

                    <Bar
                        dataKey="지난달"
                        stackId="a"
                        fill="#8F8F8F"
                        radius={[4, 4, 4, 4]}
                    ></Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className="monthCompareWrapper">
                <CountUp target={thisMonthCount} />
                <CountUp target={lastMonthCount} />
            </div>
        </>
    );
}
