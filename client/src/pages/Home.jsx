import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Banner from "../components/Home/Banner";
import HomeMain from "../components/Home/HomeMain";

import "../scss/common.scss";

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
