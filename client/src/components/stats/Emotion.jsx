import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";

// const COLORS = ["#FF7235", "#8F8F8F", "#F5B041", "#5DADE2", "#A569BD"];
// const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#E91E63"];
// const COLORS = ["#A8D5BA", "#A7C7E7", "#FFD6A5", "#E2A9BE", "#C8B6FF"];
const COLORS = ["#7BC8A4", "#75ADEE", "#FFC078", "#D78FA0", "#A793E8"];

export default function Emotion({ data }) {
    // console.log("최종", data);
    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
                <XAxis dataKey="emotion" />
                <YAxis domain={[0, 100]} tickMargin={12} />{" "}
                {/* 퍼센트는 0~100 */}
                <Tooltip formatter={value => `${value}%`} />
                <Bar dataKey="percent" barSize={25}>
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
