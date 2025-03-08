import { useState } from "react";
import { LinkBtn, Btn } from "../../components/common/Button";
import Tab from "../../components/common/Tab";
import DiaryWrite from "../../components/diary/DiaryWrite";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Write() {
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_BACK_URL;
    const [day, setDay] = useState(new Date()); // 날짜
    const [rate, setRate] = useState(0); // 평점
    const [formData, setFormData] = useState({
        title: "",
        before: null,
        after: null,
    });
    const changeValue = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const WriteGo = async e => {
        e.preventDefault();
        const payload = {
            id: 9, // 로그인연동하기
            title: formData.title,
            content: "",
            day: day.toISOString().split("T")[0],
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
        <>
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
                    <div>
                        <LinkBtn
                            // type="button"
                            to="/home/diary"
                            title="취소"
                            className="btnWhite"
                        />
                        <Btn
                            type="submit"
                            // to="/home/detail"
                            // onclick={}
                            title="등록"
                            className="btnGray"
                        />
                    </div>
                </form>
            </main>
            <footer>페이지네이션</footer>
        </>
    );
}
