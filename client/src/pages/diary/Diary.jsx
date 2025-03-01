import { Outlet } from "react-router-dom";
import Search from "../../components/common/Search";
import Tab from "../../components/common/Tab";
import DiaryListForm from "../../components/diary/DiaryListForm";

export default function Diary() {
    const tabs = [
        { title: "전체", path: "/home/diary" },
        { title: "보관함", path: "/home/diary/archive" },
    ];
    return (
        <>
            <p className="title">다이어리</p>
            <Search />
            <Tab tabs={tabs} />
            <main className="diaryContainer">
                <Outlet />
            </main>
            <footer>페이지네이션</footer>
        </>
    );
}
