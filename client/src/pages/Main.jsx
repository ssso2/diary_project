import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Banner from "../components/main/Banner";
import HomeMain from "../components/main/HomeMain";

import "../scss/common.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/login/AuthContext";

export default function Main() {
    const navigate = useNavigate();
    const { user } = useAuth();
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);

    useEffect(() => {
        const img = new Image();
        img.src = "/main/main1.svg";
        img.onload = () => setImageLoaded(true);
    }, []);

    if (!imageLoaded) return null;

    return (
        <>
            <Header />
            <main>
                <Banner />
                <HomeMain />
            </main>
            <Footer />
        </>
    );
}
