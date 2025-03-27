import { useEffect, useRef, useState } from "react";
import { LinkBtn, Btn } from "../../components/common/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DiaryEdit from "../../components/diary/DiaryEdit";
import useDiaryStore from "../../store/useDiaryStore";
import { ApiError, formatDate, uploadImgs } from "../../utils/Validation";
import { useAuth } from "../../components/login/AuthContext";

export default function Edit() {
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_BACK_URL;
    const editorRef = useRef(null);

    const { id } = useParams();
    const [day, setDay] = useState(new Date()); // 날짜
    const [rate, setRate] = useState(0); // 평점
    const [content, setContent] = useState(""); // 내용
    const [imgs, setImgs] = useState([]); // 스마트에디터 이미지
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
    const { user } = useAuth();

    //다이어리 데이터 불러오기
    const { diaryData, fetchDiaryData } = useDiaryStore();
    useEffect(() => {
        if (diaryData.length === 0) {
            fetchDiaryData(user.id);
        }
    }, []);

    useEffect(() => {
        // console.log("업데이트된 content:", content);
    }, [content]);

    //해당 다이어리 찾기
    const currentDiary = diaryData.find(diary => diary.id === Number(id));
    // console.log(diaryData, "수정페이지", id, currentDiary);
    useEffect(() => {
        if (currentDiary) {
            setDay(formatDate(currentDiary.date));
            setRate(currentDiary.rate || 0);
            setContent(currentDiary.content || "");
            // setImgs(currentDiary.)
            setTumbnail(currentDiary.thumbnail || "");
            setFile(currentDiary.file || null);
            setPosterThumbnail(currentDiary.posterThumbnail || "");
            setFormData({
                genre: currentDiary.genre || "",
                title: currentDiary.title || "",
                before: currentDiary.before_emotion || "happy",
                after: currentDiary.after_emotion || "happy2",
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

        const updated = await uploadImgs(editorRef, setContent);
        if (!updated) {
            return; // 이미지 개수 오류 걸리면 막음
        }

        const data = new FormData(); // 서버로 파일보내기 위해서 FormData 생성
        const payload = {
            diaryId: id,
            id: user.id,
            genre: formData.genre,
            title: formData.title,
            thumbnail,
            content: updated,
            day,
            rate,
            before: formData.before,
            after: formData.after,
        };
        // console.log("페이로드", payload);
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
            // console.log(payload, "api접근");
            const res = await axios.post(`${URL}/diary/edit`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(data, "수정된data확인");
            alert(res.data);
            fetchDiaryData(user.id);
            navigate(`/home/detail/${id}`);
        } catch (error) {
            console.error("에디터 이미지업로드 오류", error);
            ApiError(error);
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
                        content={content}
                        setContent={setContent}
                        imgs={imgs}
                        setImgs={setImgs}
                        editorRef={editorRef}
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
                            to={`/home/detail/${id}`}
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
