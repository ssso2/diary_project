import { useState } from "react";
import { LinkBtn, Btn } from "../../components/common/Button";
import Tab from "../../components/common/Tab";
import DiaryWrite from "../../components/diary/DiaryWrite";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { genres } from "../../components/list/genres";

export default function Write() {
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_BACK_URL;
    const [day, setDay] = useState(new Date().toISOString().split("T")[0]); // 날짜
    const [rate, setRate] = useState(0); // 평점
    const [formData, setFormData] = useState({
        genre: "",
        title: "",
        thumbnail: null,
        before: "happy",
        after: "happy",
    });
    const changeValue = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const WriteGo = async e => {
        e.preventDefault();
        const payload = {
            id: 9, // 로그인연동하기
            genre: formData.genre,
            title: formData.title,
            content: "",
            thumbnail: formData.thumbnail,
            day,
            rate,
            before: formData.before,
            after: formData.after,
        };
        try {
            console.log(payload, "api접근");
            const res = await axios.post(`${URL}/diary/write`, { payload });
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
