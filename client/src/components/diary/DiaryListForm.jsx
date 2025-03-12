import { useEffect, useState } from "react";
import "../../scss/DiaryListForm.scss";
import useDiaryStore from "../../store/useDiaryStore";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { formatDate } from "../../utils/Validation";

export default function DiaryListForm({ limit }) {
    // const [bookMark, setBookmark] = useState(false);
    const location = useLocation();
    // const navigate = useNavigate();
    // const { bookMark, setBookmark } = useOutletContext() || {}; //undefined방지 기본값!
    const { fetchDiaryData, diaryData, toggleBookmark, updateDiaries } =
        useDiaryStore(); // 다이어리데이터
    console.log("다이어리데이터확인", diaryData);

    useEffect(() => {
        console.log("다이어리서버시도");
        fetchDiaryData(9);
        return () => {
            updateDiaries();
        };
    }, []);

    const BookmarkTab = location.pathname.includes("/home/diary/bookmark");
    const showDiaries = (Array.isArray(diaryData) ? diaryData : [])
        .filter(diary =>
            BookmarkTab
                ? diary.bookmark === 1
                : diary.bookmark === 0 || diary.bookmark === 1
        ) //북마크 필터링
        .slice(0, limit); //개수 제한

    const changeBookmark = id => {
        toggleBookmark(id); // 콘솔창 상태업데이트까지 진행
        if (BookmarkTab) {
            alert("북마크에서 삭제되었습니다.");
        }
        // setBookmark(!bookMark);
        // }
    };
    return (
        <section className="container">
            {showDiaries.length > 0 ? (
                showDiaries.map(diary => (
                    // {{diary.bookmark} === 0 &&(
                    <article className="diaryWrapper" key={diary.id}>
                        <header className="infoWrap">
                            <div className="diaryInfo">
                                <button
                                    aria-label="북마크"
                                    onClick={() => changeBookmark(diary.id)}
                                >
                                    {diary.bookmark === 1 ? (
                                        <img
                                            src="/icon/bookmarkFill.svg"
                                            alt="북마크 추가"
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
                                <p className="subtitle">애니메이션</p>
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
                            <section className="review">
                                <p>{diary.content}</p>
                            </section>
                            <div className="optionwrap">
                                <div className="option">
                                    <img
                                        src="/icon/calendar.svg"
                                        alt="달력 아이콘"
                                    />
                                    <p className="txt">
                                        {formatDate(diary.date)}
                                    </p>
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
                        <figure className="poster">
                            <img
                                src="/sub/poster.png"
                                alt="미녀와 야수 포스터"
                            />
                        </figure>
                    </article>
                    // )}
                ))
            ) : (
                <p>등록된 다이어리가 없습니다.</p>
            )}

            {limit ? (
                ""
            ) : (
                <nav
                    className="paginationContainer"
                    aria-label="페이지 네비게이션"
                >
                    123
                </nav>
            )}
        </section>
    );
}
