import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import useDiaryStore from "../../store/useDiaryStore";

export default function Chart() {
    const { diaryData } = useDiaryStore();
    // console.log("다이어리데이터오나", diaryData);
    const today = new Date();
    const targetYear = today.getFullYear(); //올해년도
    const monthAr = Array(12).fill(0);
    diaryData.map(diary => {
        const date = new Date(diary.date);
        const month = date.getMonth(); // 0부터 11 반환
        const year = date.getFullYear();
        if (year === targetYear) {
            monthAr[month] += 1;
        }
        return null; //반환값 없음
    });

    // console.log("나와", diaryData, monthAr);
    //최종데이터
    const lineData = monthAr.map((diary, idx) => ({
        month: `${idx + 1}`,
        diary,
    }));
    //누적
    const total = monthAr.reduce((acc, cur) => acc + cur, 0);

    return (
        <>
            <div className="chartHeader">
                <p className="year">
                    {targetYear}-01-01 ~ {targetYear}-12-31
                </p>
            </div>
            <div className="chartBox">
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={lineData}>
                        <XAxis
                            dataKey="month"
                            interval={0}
                            padding={{ left: 20, right: 20 }}
                        />
                        <YAxis tickCount={4} width={30} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="diary"
                            stroke="#FF7235"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
