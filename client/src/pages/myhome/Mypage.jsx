import { useEffect, useState } from "react";

import styles from "../../scss/pages/Join.module.scss";

import { useAuth } from "../../components/login/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Pwchk from "./Pwchk";
import Pwchange from "./Pwchange";

export default function Mypage() {
    const { resetForm, mystep, setMystep } = useAuth();
    const location = useLocation();

    //경로 재접근
    useEffect(() => {
        if (location.pathname === "/home/mypage") {
            resetForm();
            setMystep(1);
        }
    }, [location.pathname]);

    return (
        <div className={styles.wrapper}>
            <main className={styles.wrap}>
                <div className={styles.formContainer}>
                    {mystep === 1 && <Pwchk />}
                    {mystep === 2 && <Pwchange />}
                </div>
            </main>
        </div>
    );
}
