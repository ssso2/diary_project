import { create } from "zustand";
import axios from "axios";

const URL = process.env.REACT_APP_BACK_URL; // 외부선언

const useDiaryStore = create((set, get) => ({
    user: null, // 회원정보
    diaryData: [], // 다이어리 전체 데이터
    setUser: userData => set({ user: userData }),

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
        }
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
    },

    //북마크 상태 서버 업데이트
    updateDiaries: async () => {
        const { diaryData } = get() || {};
        const newDiaryData = diaryData
            .filter(diary => diary.changed)
            .map(diary => ({ id: diary.id, bookmark: diary.bookmark }));
        try {
            if (newDiaryData.length === 0) {
                // 업데이트데이터 없을때 서버요청 생략
                return;
            }
            const res = await axios.post(`${URL}/diary/list/updatelist`, {
                newDiaryData,
            });
            console.log("업데이트확인", res.data);
            set({ diaryData: res.data });
        } catch (error) {
            console.error("다이어리데이터 로딩오류", error);
        }
    },
}));

export default useDiaryStore;
