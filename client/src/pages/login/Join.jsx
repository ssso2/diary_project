import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderB from "../../components/common/HeaderB";
import Footer from "../../components/common/Footer";
import JoinForm from "../../components/login/JoinForm";
import JoinSuccess from "../../components/login/JoinSuccess";

import styles from "../../scss/pages/Join.module.scss";

export default function Join() {
    // const navigate = useNavigate();
    const URL = process.env.REACT_APP_BACK_URL;
    const [joinSuccess, setjoinSuccess] = useState(false);

    const joinGo = async (email, pw, name) => {
        try {
            await axios.post(`${URL}/join/member`, { email, pw, name });
            setjoinSuccess(true);
        } catch (error) {
            console.error("회원가입 오류:", error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <header>
                <HeaderB />
            </header>
            <main className={styles.wrap}>
                <div className={styles.formContainer}>
                    {joinSuccess ? (
                        <JoinSuccess />
                    ) : (
                        <JoinForm joinGo={joinGo} />
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
