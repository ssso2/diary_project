import { useEffect, useState } from "react";
import "../../scss/DiaryListForm.scss";
import useDiaryStore from "../../store/useDiaryStore";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { extractSummary, formatDate } from "../../utils/Validation";
import Pagenation from "../common/Pagenation";
import { useAuth } from "../login/AuthContext";

export default function DiaryListForm({ limit }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const navigate = useNavigate();
    const { user } = useAuth();

    const { isBookmark } = useOutletContext() || {}; //최신다이어리 context undefined 방지

    const { filteredData, toggleBookmark, updateDiaries, filterDiaryData } =
        useDiaryStore(); // 다이어리데이터

    //페이지네이션
    const [currentPage, setcurrentPage] = useState(1);
    const PerPage = 5;
    const firstIndex = (currentPage - 1) * PerPage;
    const sorted = [
        ...filteredData.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        }),
    ];

    const showDiaries = Array.isArray(sorted)
        ? sorted.slice(0, limit ?? sorted.length) // null, undefined경우 배열전체
        : [];

    const pageDiaries = showDiaries.slice(firstIndex, firstIndex + PerPage); //0-9 10개씩 출력
    const totalPage = Math.ceil(filteredData.length / PerPage);

    const changeBookmark = id => {
        toggleBookmark(id); //북마크 상태변경
        updateDiaries(user.id); //북마크 업데이트 api요청
        filterDiaryData(); //데이터필터링
        if (isBookmark) {
            alert("북마크에서 삭제되었습니다.");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    return (
        <section className="container">
            {pageDiaries.length > 0 ? (
                pageDiaries.map(diary => (
                    // {{diary.bookmark} === 0 &&(
                    <article className="diaryWrapper" key={diary.id}>
                        <header className="infoWrap">
                            <div className="diaryInfo">
                                <button
                                    aria-label="북마크"
                                    onClick={() => changeBookmark(diary.id)}
                                    title="북마크"
                                >
                                    {diary.bookmark === 1 ? (
                                        <img
                                            src="/icon/bookmarkFill.svg"
                                            alt="북마크 추가"
                                            title="북마크"
                                        />
                                    ) : (
                                        <img
                                            src="/icon/bookmark.svg"
                                            alt="북마크 해제"
                                        />
                                    )}
                                </button>
                                <h2 className="title">{diary.title}</h2>
                                <span className="subtitle">·</span>
                                <p className="subtitle">{diary.genre}</p>
                            </div>
                            <div className="emotionwrap">
                                <div className="emotion">
                                    <p className="txt">감상 전</p>
                                    <img
                                        src={`/icon/${diary.before_emotion}.svg`}
                                        alt={`감상 전 감정: ${diary.before_emotion}`}
                                    />
                                </div>
                                <div className="emotion">
                                    <p className="txt">감상 후</p>
                                    <img
                                        src={`/icon/${diary.after_emotion}.svg`}
                                        alt={`감상 후 감정: ${diary.after_emotion}`}
                                    />
                                </div>
                            </div>
                            <button
                                className="review"
                                onClick={() =>
                                    navigate(`/home/detail/${diary.id}`)
                                }
                            >
                                <p>{extractSummary(diary.content)}</p>
                            </button>
                            <div className="optionwrap">
                                <div className="option">
                                    <img
                                        src="/icon/calendar.svg"
                                        alt="달력 아이콘"
                                    />
                                    <time
                                        dateTime={formatDate(diary.date)}
                                        className="txt"
                                    >
                                        {" "}
                                        {formatDate(diary.date)}
                                    </time>
                                </div>
                                <div className="option">
                                    <img
                                        src="/icon/starFill.svg"
                                        alt="별점 아이콘"
                                    />
                                    <p className="txt">{diary.rate}</p>
                                </div>
                            </div>
                        </header>
                        <figure
                            className="poster"
                            onClick={() => navigate(`/home/detail/${diary.id}`)}
                        >
                            {diary.thumbnail &&
                            diary.thumbnail.startsWith("http") ? (
                                <img
                                    src={diary.thumbnail}
                                    alt={`${diary.title}포스터`}
                                />
                            ) : (
                                <img
                                    src={`${URL}/imgs/diary/${diary.thumbnail}`}
                                    alt="기본썸네일"
                                />
                            )}
                        </figure>
                    </article>
                ))
            ) : (
                <p className="empty">등록된 다이어리가 없습니다.</p>
            )}

            {limit ? (
                ""
            ) : (
                <nav
                    className="paginationContainer"
                    aria-label="페이지 네비게이션"
                >
                    <Pagenation
                        currentPage={currentPage}
                        totalPage={totalPage}
                        pageChange={setcurrentPage}
                    />
                </nav>
            )}
        </section>
    );
}
