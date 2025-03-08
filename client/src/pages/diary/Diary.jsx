import { Link, Outlet } from "react-router-dom";
import Search from "../../components/common/Search";
import Tab from "../../components/common/Tab";
import DiaryListForm from "../../components/diary/DiaryListForm";
import { LinkBtn } from "../../components/common/Button";

export default function Diary() {
    const tabs = [
        { title: "전체", path: "/home/diary" },
        { title: "보관함", path: "/home/diary/archive" },
    ];
    return (
        <>
            <div className="titlewrap">
                <p className="title">다이어리</p>

                <LinkBtn
                    to="/home/write"
                    title=" + 등록"
                    className="btnOrange"
                />
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
