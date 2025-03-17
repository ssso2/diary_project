import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import { useEffect, useRef, useState } from "react";

export default function LoginHeader() {
    const { user, logout } = useAuth();
    const [drop, setDrop] = useState(false);
    const location = useLocation();
    // const modalRef = useRef(null);

    useEffect(() => {
        setDrop(false);
    }, [location.pathname]);

    return (
        <header>
            <div className="loginheader">
                <buttton
                    type="button"
                    className="mygo"
                    onClick={() => setDrop(true)}
                >
                    <img src="/icon/profile.svg" alt="프로필 로고" />
                </buttton>
                {drop && (
                    <div
                        className="modalOverlay"
                        // ref={modalRef}
                        onClick={() => setDrop(false)}
                    >
                        <div
                            className="moreContainer mypage"
                            onClick={e => e.stopPropagation()}
                        >
                            <ul className="modalWrap mypage">
                                <li className="list under">{user?.name} 님</li>
                                <li className="list">
                                    <Link to="mypage" className="edit">
                                        {/* <button className="edit" onClick={mypageGo}> */}
                                        개인정보변경
                                        {/* </button> */}
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
            </div>
        </header>
    );
}
