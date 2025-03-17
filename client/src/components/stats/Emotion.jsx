import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";

const emotionData = [
    { emotion: "행복", percent: 40 },
    { emotion: "슬픔", percent: 20 },
    { emotion: "분노", percent: 15 },
    { emotion: "놀람", percent: 10 },
    { emotion: "무표정", percent: 15 },
];

// const COLORS = ["#FF7235", "#8F8F8F", "#F5B041", "#5DADE2", "#A569BD"];

export default function Emotion() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emotionData}>
                <XAxis dataKey="emotion" /> {/* 감정명이 아래쪽에 표시 */}
                <YAxis domain={[0, 100]} /> {/* 퍼센트는 0~100 */}
                <Tooltip formatter={value => `${value}%`} />
                <Bar dataKey="percent" barSize={30}>
                    {/* {emotionData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))} */}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
