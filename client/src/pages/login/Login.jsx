import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import HeaderB from "../../components/common/HeaderB";
import Footer from "../../components/common/Footer";
import LoginForm from "../../components/login/LoginForm";

import styles from "../../scss/pages/Login.module.scss";
import { useAuth } from "../../components/login/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);

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
                            <LoginForm />
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
