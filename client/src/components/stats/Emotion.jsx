import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#FF7235", "#8F8F8F", "#F5B041", "#5DADE2", "#A569BD"];

export default function Emotion({ data }) {
    // console.log("최종", data);
    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
                <XAxis dataKey="emotion" />
                <YAxis domain={[0, 100]} /> {/* 퍼센트는 0~100 */}
                <Tooltip formatter={value => `${value}%`} />
                <Bar dataKey="percent" barSize={30}>
                    {data.map((entry, index) => (
                        <Cell
                            // key={`cell-${index}`}
                            fill="#ffb700"
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
