import { Link } from "react-router-dom";
import "../scss/common.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import HomeMain from "../components/HomeMain";

export default function Home() {
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
