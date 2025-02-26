import { Link } from "react-router-dom";
import "../scss/home.scss";

export default function Home() {
    return (
        <div className="wrapper">
            텍스트플렉스랩
            <p>내가 감상한</p>
            <p>일상의</p>
            <p>씬-기록</p>
            <Link to="/login">로그인/회원가입</Link>
        </div>
    );
}
