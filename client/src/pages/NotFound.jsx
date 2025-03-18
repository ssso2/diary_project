import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="notfound">
            <h1 className="noTitle">404</h1>
            <p className="not">페이지를 찾을 수 없습니다.</p>
            <Link to="https://github.com/ssso2" className="btnOrange nobtn">
                문의하기
            </Link>
        </div>
    );
}
