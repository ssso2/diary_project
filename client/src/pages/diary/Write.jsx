import { useState } from "react";
import { LinkBtn, Btn } from "../../components/common/Button";
import Tab from "../../components/common/Tab";
import DiaryWrite from "../../components/diary/DiaryWrite";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Write() {
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_BACK_URL;
    const [day, setDay] = useState(new Date().toISOString().split("T")[0]); // 날짜
    const [rate, setRate] = useState(0); // 평점
    const [formData, setFormData] = useState({
        genre: "",
        title: "",
        // thumbnail: null,
        before: "happy",
        after: "happy",
    });
    //썸네일
    const [file, setFile] = useState(null);
    const [posterThumbnail, setPosterThumbnail] = useState("");

    const changeValue = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const WriteGo = async e => {
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
            const res = await axios.post(`${URL}/diary/write`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(res.data);

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
                    <DiaryWrite
                        day={day}
                        setDay={setDay}
                        rate={rate}
                        setRate={setRate}
                        setFile={setFile}
                        setPosterThumbnail={setPosterThumbnail}
                        formData={formData}
                        changeValue={changeValue}
                    />
                    <div className="btnWrap">
                        <LinkBtn
                            to="/home/diary"
                            title="취소"
                            className="btnWhite"
                        />
                        <Btn type="submit" title="등록" className="btnGray" />
                    </div>
                </form>
            </main>
        </div>
    );
}
