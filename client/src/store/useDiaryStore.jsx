import { create } from "zustand";
import axios from "axios";
import { ApiError } from "../utils/Validation";

const URL = process.env.REACT_APP_BACK_URL; // 외부선언

const useDiaryStore = create((set, get) => ({
    user: null, // 회원정보
    diaryData: [], // 다이어리 전체 데이터
    filteredData: [], // 북마크 검색어 필터 데이터
    setUser: userData => set({ user: userData }),
    keyword: "", // 검색어
    bookmarkTab: false, //북마크탭인지

    // 다이어리 전체 불러오기
    fetchDiaryData: async userId => {
        try {
            const res = await axios.get(`${URL}/diary/list/${userId}`);
            const imgres = res.data.map(data => ({
                ...data,
                thumbnail: `${URL}/imgs/diary/dathumbnail/${data.thumbnail}`,
            })); // 정적폴더에서 이미지 출력
            console.log(imgres);
            set({ diaryData: res.data });
        } catch (error) {
            console.error("다이어리데이터 로딩오류", error);
            ApiError(error);
        }
    },

    //키워드 북마크 필터
    filterDiaryData: () => {
        const { diaryData, bookmarkTab, keyword } = get() || {};
        if (!Array.isArray(diaryData)) return; // 데이터없을경우 방지
        const filtered = diaryData.filter(
            diary =>
                (!bookmarkTab || diary.bookmark === 1) && // 북마크 필터
                (keyword === "" || diary.title.includes(keyword)) // 검색어 필터
        );
        set({ filteredData: filtered });
    },
    setKeyword: newkeyword => {
        set({ keyword: newkeyword });
    },
    setBookmarkTab: newTab => {
        set({ bookmarkTab: newTab });
    },

    //북마크 상태 변경 이벤트
    toggleBookmark: id => {
        set(prev => ({
            diaryData: prev.diaryData.map(diary =>
                diary.id === id
                    ? {
                          ...diary,
                          bookmark: diary.bookmark ? 0 : 1,
                          changed: true,
                      }
                    : diary
            ),
        }));
        get().filterDiaryData(); // 북마크 상태 변경 후 필터 재적용
    },

    //북마크 상태 서버 업데이트
    updateDiaries: async userId => {
        const { diaryData } = get() || {};
        const newDiaryData = diaryData
            .filter(diary => diary.changed)
            .map(diary => ({
                member_id: userId,
                id: diary.id,
                bookmark: diary.bookmark,
            }));
        try {
            if (newDiaryData.length === 0) {
                // 업데이트데이터 없을때 서버요청 생략
                return;
            }
            const res = await axios.post(`${URL}/diary/list/updatelist`, {
                newDiaryData,
            });
            console.log("업데이트확인", res.data);
            set({ diaryData: res.data.diaryData });
        } catch (error) {
            console.error("다이어리데이터 로딩오류", error);
        }
    },
}));

export default useDiaryStore;
