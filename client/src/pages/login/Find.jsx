import { useEffect, useState } from "react";
import HeaderB from "../../components/common/HeaderB";
import Footer from "../../components/common/Footer";

import styles from "../../scss/pages/Join.module.scss";

import { useAuth } from "../../components/login/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import FindPw from "../../components/login/FindPw";
import PwChange from "../../components/login/PwChange";
import PwSuccess from "../../components/login/PwSuccess";

export default function Find() {
    const navigate = useNavigate();
    const { user, step, setPwCheckSuccess, setStep, resetForm } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    //성공컴포넌트 진입 시 폼 상태 초기화
    useEffect(() => {
        if (step === 3) {
            resetForm();
        }
    }, [step]);

    //경로 재접근
    useEffect(() => {
        if (location.pathname === "/find") {
            setPwCheckSuccess(false);
            setStep(1);
        }
    }, [location.pathname]);

    return (
        <div className={styles.wrapper}>
            <header>
                <HeaderB />
            </header>
            <main className={styles.wrap}>
                <div className={styles.formContainer}>
                    {step === 1 && <FindPw />}
                    {step === 2 && <PwChange />}
                    {step === 3 && <PwSuccess />}
                </div>
            </main>
            <Footer />
        </div>
    );
}
