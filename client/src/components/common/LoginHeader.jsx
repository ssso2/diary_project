import { Link } from "react-router-dom";

export default function LoginHeader() {
    return (
        <header>
            <div className="loginheader">
                {/* <img src="/icon." alt="프로필" /> */}
                <Link to="/" className="mygo">
                    홍길동님
                </Link>
            </div>
        </header>
    );
}
