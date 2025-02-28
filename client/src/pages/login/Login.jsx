import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import HeaderB from "../../components/common/HeaderB";
import Footer from "../../components/common/Footer";
import LoginForm from "../../components/Login/LoginForm";

import styles from "../../scss/pages/Login.module.scss";

export default function Login() {
    const URL = process.env.REACT_APP_BACK_URL;
    const navigate = useNavigate();

    // 서버 요청
    const loginGo = async (email, pw) => {
        try {
            const res = await axios.post(`${URL}/login`, { email, pw });
            alert(`${res.data.name}님 로그인되었습니다.`);
            navigate("/");
        } catch (error) {
            console.error("로그인 오류", error);
            const message =
                error.response?.data?.error || "로그인에 실패했습니다.";
            if (error.response) {
                alert(message);
            } else if (error.request) {
                alert("서버 응답이 없습니다. 잠시 후 다시 시도해주세요.");
            } else {
                alert(
                    "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요."
                );
            }
        }
    };

    return (
        <div>
            <HeaderB />

            <main className={styles.wrap}>
                <div className={styles.loginContainer}>
                    <div className={styles.formWrap}>
                        <div className={styles.logoWrap}>
                            <img src="/main/logoB.svg" alt="로고" />
                        </div>
                        <div className={styles.form}>
                            <LoginForm loginGo={loginGo} />
                        </div>
                        <div className={styles.linkWrap}>
                            <Link to="/join">회원가입</Link>
                            <Link to="/find">아이디/비밀번호찾기</Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
