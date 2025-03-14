import { Link, Outlet, useLocation } from "react-router-dom";
import Search from "../../components/common/Search";
import Tab from "../../components/common/Tab";
// import DiaryListForm from "../../components/diary/DiaryListForm";
import { LinkBtn } from "../../components/common/Button";
import { useEffect, useState } from "react";
import useDiaryStore from "../../store/useDiaryStore";

export default function Diary() {
    const tabs = [
        { title: "전체", path: "/home/diary" },
        { title: "북마크", path: "/home/diary/bookmark" },
    ];
    const [bookMark, setBookmark] = useState(false);
    const [input, setInput] = useState("");

    const location = useLocation();
    const isBookmark = location.pathname.includes("/home/diary/bookmark");

    const {
        fetchDiaryData,
        diaryData,
        filterDiaryData,
        keyword,
        setKeyword,
        bookmarkTab,
        setBookmarkTab,
        filteredData,
    } = useDiaryStore();

    useEffect(() => {
        if (diaryData.length === 0) {
            console.log("다이어리 페이지 데이터 패치 실행");
            fetchDiaryData(9);
        }
        window.scrollTo(0, 0);
    }, []);

    // 탭 전환 시 검색어 초기화
    useEffect(() => {
        setInput("");
        setKeyword("");
        setBookmarkTab(isBookmark);
    }, [location.pathname]);

    // 검색어, 북마크 여부 변경될 때마다 필터링 실행
    useEffect(() => {
        filterDiaryData();
        console.log("");
    }, [bookmarkTab, keyword, diaryData]);

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
            <Search
                input={input}
                setInput={setInput}
                keyword={keyword}
                setKeyword={setKeyword}
            />
            <Tab tabs={tabs} />
            <main className="diaryContainer listContainer">
                <Outlet context={{ isBookmark }} />
            </main>
        </>
    );
}
