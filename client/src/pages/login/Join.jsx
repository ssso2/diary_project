import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderB from "../../components/common/HeaderB";
import Footer from "../../components/common/Footer";
import JoinForm from "../../components/login/JoinForm";
import JoinSuccess from "../../components/login/JoinSuccess";

import styles from "../../scss/pages/Join.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/login/AuthContext";

export default function Join() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, joinSuccess, setjoinSuccess } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);

    // 다시 join으로 올 때마다 상태 초기화
    useEffect(() => {
        if (location.pathname === "/join") {
            setjoinSuccess(false);
        }
    }, [location.pathname]);

    return (
        <div className={styles.wrapper}>
            <header>
                <HeaderB />
            </header>
            <main className={styles.wrap}>
                <div className={styles.formContainer}>
                    {joinSuccess ? <JoinSuccess /> : <JoinForm />}
                </div>
            </main>
            <Footer />
        </div>
    );
}
