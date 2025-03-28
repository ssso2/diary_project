import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import { useEffect, useRef, useState } from "react";
import SideNav from "./SideNav";

export default function LoginHeader({ setOpen }) {
    const { user, logout } = useAuth();
    const [drop, setDrop] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setDrop(false);
    }, [location.pathname]);

    return (
        <>
            <header>
                <div className="loginheader">
                    <div className="tabletNav">
                        <button
                            onClick={() => {
                                setOpen(prev => !prev);
                                // console.log("클릭");
                            }}
                            className="hamburger"
                        >
                            <img src="/icon/menu.svg" />
                        </button>
                        <Link to="/home" className="headerLogo">
                            <img src="/main/logoB.svg" />
                        </Link>
                    </div>
                    <button
                        type="button"
                        className="mygo"
                        onClick={() => setDrop(true)}
                    >
                        <img src="/icon/profile.svg" alt="프로필 로고" />
                    </button>
                </div>
            </header>
            {drop && (
                <div className="modalOverlay" onClick={() => setDrop(false)}>
                    <div
                        className="moreContainer mypage"
                        onClick={e => e.stopPropagation()}
                    >
                        <ul className="modalWrap mypage">
                            <li className="list under">{user?.name} 님</li>
                            <li className="list">
                                <Link to="mypage" className="edit">
                                    개인정보변경
                                </Link>
                            </li>
                            <li className="list">
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="delete logout"
                                >
                                    로그아웃
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
