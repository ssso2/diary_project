import { Link, Outlet } from "react-router-dom";
import Search from "../../components/common/Search";
import Tab from "../../components/common/Tab";
// import DiaryListForm from "../../components/diary/DiaryListForm";
import { LinkBtn } from "../../components/common/Button";
import { useState } from "react";

export default function Diary() {
    const tabs = [
        { title: "전체", path: "/home/diary" },
        { title: "북마크", path: "/home/diary/bookmark" },
    ];
    const [bookMark, setBookmark] = useState(false);

    return (
        <>
            <div className="titlewrap">
                <h1 className="title">다이어리</h1>
                <LinkBtn
                    to="/home/write"
                    title=" + 등록"
                    className="btnOrange"
                />
            </div>
            <Search />
            <Tab tabs={tabs} />
            <main className="diaryContainer listContainer">
                <Outlet context={{ bookMark, setBookmark }} />
            </main>
        </>
    );
}
