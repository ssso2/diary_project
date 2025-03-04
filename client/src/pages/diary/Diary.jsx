import { Link, Outlet } from "react-router-dom";
import Search from "../../components/common/Search";
import Tab from "../../components/common/Tab";
import DiaryListForm from "../../components/diary/DiaryListForm";
import Button from "../../components/common/Button";

export default function Diary() {
    const tabs = [
        { title: "전체", path: "/home/diary" },
        { title: "보관함", path: "/home/diary/archive" },
    ];
    return (
        <>
            <div className="titlewrap">
                <p className="title">다이어리</p>
                <Link to="/home/register" className="btnOrange">
                    + 등록
                </Link>
                {/* <Button /> */}
            </div>
            <Search />
            <Tab tabs={tabs} />
            <main className="diaryContainer">
                <Outlet />
            </main>
            <footer>페이지네이션</footer>
        </>
    );
}
