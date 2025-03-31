import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useDiaryStore from "../../store/useDiaryStore";

const COLORS = ["#ffb700", "#4a90e2"];

export default function Thumbnail() {
    const { diaryData } = useDiaryStore();

    //데이터추출
    const poster = [];
    const file = [];
    diaryData.forEach(diary => {
        if (diary.thumbnail && diary.thumbnail.startsWith("http")) {
            poster.push(diary);
        } else if (diary.thumbnail && diary.thumbnail === "1741332504472.png") {
            file.push(diary);
        }
    });

    //유형별 개수
    const fileCount = file.length;
    const posterCount = poster.length;
    // console.log("썸네일개수", fileCount, posterCount);

    //퍼센트 구하기
    const total = posterCount + fileCount;
    const posterPercent = total ? (posterCount / total) * 100 : 0;
    const filePercent = total ? (fileCount / total) * 100 : 0;
    // console.log("퍼센트", posterPercent, filePercent);

    // const data = [
    //     {
    //         name: "포스터",
    //         value: poster.length,
    //         percent: posterPercent,
    //         fill: "#FF7235",
    //     },
    //     {
    //         name: "이미지 첨부",
    //         value: file.length,
    //         percent: filePercent,
    //         fill: "#DBDBDB",
    //     },
    // ];

    // 데이터없을 경우 기본 도넛추가
    const data =
        total > 0
            ? [
                  { name: "포스터", value: posterCount, fill: "#FF7235" },
                  { name: "이미지 첨부", value: fileCount, fill: "#DBDBDB" },
              ]
            : [{ name: "데이터 없음", value: 1, fill: "#8F8F8F" }];
    return (
        <>
            <div className="typeWrap">
                <div className="type">
                    <span className="fill"></span>
                    <p className="typeName">
                        포스터 {Math.round(posterPercent)}%
                    </p>
                </div>
                <div className="type">
                    <span className="fill bar"></span>
                    <p className="typeName">
                        이미지첨부 {Math.round(filePercent)}%
                    </p>
                </div>
            </div>
            <div className="chartBox">
                <ResponsiveContainer
                    width="100%"
                    height={200}
                    className="ThubnailWrap"
                >
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value" // 개수
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={90}
                            fill="#8884d8"
                            // label={({ percent }) => `${Math.round(percent)}%`}
                        >
                            {data.map(({ name, fill }) => (
                                <Cell key={name} fill={fill} />
                            ))}
                        </Pie>
                        {/* <Tooltip formatter={value => `${value}%`} /> */}
                        <Tooltip
                            formatter={(value, name) => [`${value}개`, name]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
