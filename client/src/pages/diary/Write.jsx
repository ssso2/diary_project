import { useEffect, useRef, useState } from "react";
import { LinkBtn, Btn } from "../../components/common/Button";
import Tab from "../../components/common/Tab";
import DiaryWrite from "../../components/diary/DiaryWrite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useDiaryStore from "../../store/useDiaryStore";
import { useAuth } from "../../components/login/AuthContext";
import {
    ApiError,
    dataURLtoBlob,
    formatNewDate,
    uploadImgs,
} from "../../utils/Validation";
import Mwrite from "../../components/diary/Mwrite";

export default function Write() {
    const [mobile, setMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const editorRef = useRef(null);
    const [editorReady, setEditorReady] = useState(false);
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_BACK_URL;
    const { fetchDiaryData } = useDiaryStore();
    const { user } = useAuth();
    const [day, setDay] = useState(formatNewDate(new Date())); // 날짜
    const [rate, setRate] = useState(0); // 평점
    const [content, setContent] = useState(""); // 내용
    const [imgs, setImgs] = useState([]); // 스마트에디터 이미지
    const [formData, setFormData] = useState({
        genre: "",
        title: "",
        // thumbnail: null,
        before: "happy",
        after: "happy2",
    });
    //썸네일
    const [file, setFile] = useState(null);
    const [posterThumbnail, setPosterThumbnail] = useState("");

    const changeValue = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const WriteGo = async e => {
        // console.log("유저확인할게요", user.id);
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
            id: user.id,
            genre: formData.genre,
            title: formData.title,
            // content: "",
            content: updated,
            imgs,
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
            // console.log(payload, "api접근");
            const res = await axios.post(`${URL}/diary/write`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(res.data);
            fetchDiaryData(user.id);
            navigate("/home/diary");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modalRelative">
            <div className="titlewrap">
                <p className="title">다이어리 등록</p>
            </div>
            <main className="diaryContainer">
                <form onSubmit={WriteGo}>
                    {mobile ? (
                        <Mwrite
                            day={day}
                            setDay={setDay}
                            rate={rate}
                            setRate={setRate}
                            setFile={setFile}
                            setPosterThumbnail={setPosterThumbnail}
                            formData={formData}
                            changeValue={changeValue}
                            content={content}
                            setContent={setContent}
                            imgs={imgs}
                            setImgs={setImgs}
                            editorRef={editorRef}
                        />
                    ) : (
                        <DiaryWrite
                            day={day}
                            setDay={setDay}
                            rate={rate}
                            setRate={setRate}
                            setFile={setFile}
                            setPosterThumbnail={setPosterThumbnail}
                            formData={formData}
                            changeValue={changeValue}
                            content={content}
                            setContent={setContent}
                            imgs={imgs}
                            setImgs={setImgs}
                            editorRef={editorRef}
                        />
                    )}
                    <div className="btnWrap">
                        <LinkBtn
                            to="/home/diary"
                            title="취소"
                            className="btnWhite"
                        />
                        <Btn type="submit" title="등록" className="btnOrange" />
                    </div>
                </form>
            </main>
        </div>
    );
}
