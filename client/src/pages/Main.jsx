import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Banner from "../components/main/Banner";
import HomeMain from "../components/main/HomeMain";

import "../scss/common.scss";

export default function Main() {
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
