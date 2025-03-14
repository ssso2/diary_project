import { useEffect, useState } from "react";
import { LinkBtn, Btn } from "../../components/common/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DiaryEdit from "../../components/diary/DiaryEdit";
import useDiaryStore from "../../store/useDiaryStore";
import { formatDate } from "../../utils/Validation";

export default function Edit() {
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_BACK_URL;
    const { id } = useParams();
    const [day, setDay] = useState(new Date()); // 날짜
    const [rate, setRate] = useState(0); // 평점
    const [formData, setFormData] = useState({
        genre: "",
        title: "",
        before: "happy",
        after: "happy2",
    });
    //썸네일
    const [file, setFile] = useState(null);
    const [posterThumbnail, setPosterThumbnail] = useState("");
    const [thumbnail, setTumbnail] = useState("");

    //다이어리 데이터 불러오기
    const { diaryData, fetchDiaryData } = useDiaryStore();
    useEffect(() => {
        if (diaryData.length === 0) {
            fetchDiaryData(9);
        }
    }, []);

    //해당 다이어리 찾기
    const currentDiary = diaryData.find(diary => diary.id === Number(id));
    console.log(diaryData, "수정페이지", id, currentDiary);
    useEffect(() => {
        if (currentDiary) {
            setDay(formatDate(currentDiary.date));
            setRate(currentDiary.rate || 0);
            setTumbnail(currentDiary.thumbnail || "");
            setFile(currentDiary.file || null);
            setPosterThumbnail(currentDiary.posterThumbnail || "");
            setFormData({
                genre: currentDiary.genre || "",
                title: currentDiary.title || "",
                before: currentDiary.before || "happy",
                after: currentDiary.after || "happy2",
            });
        }
    }, [currentDiary]);

    if (!currentDiary) return <p></p>;

    const changeValue = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const modifyGo = async e => {
        e.preventDefault();
        if (!formData.genre || !formData.title || !rate) {
            alert("모든 항목을 입력해 주세요.");
            return;
        }
        const data = new FormData(); // 서버로 파일보내기 위해서 FormData 생성
        const payload = {
            id: 9, // 로그인연동하기
            genre: formData.genre,
            title: formData.title,
            content: "",
            day,
            rate,
            before: formData.before,
            after: formData.after,
        };
        for (const key in payload) {
            data.append(key, payload[key]);
        }
        if (file) {
            data.append("file", file); // 이미지파일업로드는 꼭 파일필드로
        }
        if (posterThumbnail) {
            data.append("posterThumbnail", posterThumbnail);
        }
        try {
            console.log(payload, "api접근");
            const res = await axios.post(`${URL}/diary/edit`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(res.data);
            navigate(`/home/detail/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modalRelative">
            <div className="titlewrap">
                <p className="title">다이어리 수정</p>
            </div>
            <main className="diaryContainer">
                <form onSubmit={modifyGo}>
                    <DiaryEdit
                        day={day}
                        setDay={setDay}
                        rate={rate}
                        setRate={setRate}
                        file={file}
                        setFile={setFile}
                        posterThumbnail={posterThumbnail}
                        setPosterThumbnail={setPosterThumbnail}
                        thumbnail={thumbnail}
                        formData={formData}
                        changeValue={changeValue}
                    />
                    <div className="btnWrap">
                        <LinkBtn
                            to="/home/diary"
                            title="취소"
                            className="btnWhite"
                        />
                        <Btn type="submit" title="수정" className="btnOrange" />
                    </div>
                </form>
            </main>
        </div>
    );
}
