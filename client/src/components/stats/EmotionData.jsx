import useDiaryStore from "../../store/useDiaryStore";

export function useEmotionData() {
    const { diaryData } = useDiaryStore();

    // 감정 배열화
    const beforeEmotion = diaryData.map(diary => diary.before_emotion);
    const afterEmotion = diaryData.map(diary => diary.after_emotion);

    // 감정 총 개수
    const emotionTotal = beforeEmotion.length;

    // 타입정리
    const beforeTypes = [
        "happy",
        "excited",
        "neutral",
        "angry",
        "sad",
        "unpleasant",
    ];
    const beforeLabel = ["즐거움", "설렘", "평온", "분노", "슬픔", "불쾌"];
    const afterTypes = [
        "happy2",
        "touched2",
        "neutral2",
        "angry2",
        "sad2",
        "scared2",
    ];
    const afertLabel = ["즐거움", "감동", "평온", "분노", "슬픔", "공포"];

    //데이터추출
    const beforeData = beforeTypes.map((item, idx) => {
        const emotionCount = beforeEmotion.filter(
            emotion => emotion === item
        ).length;
        const percent = Math.round((emotionCount / emotionTotal) * 100);
        const emotion = beforeLabel[idx];
        return { item, emotion, emotionCount, percent };
    });

    const afterData = afterTypes.map((item, idx) => {
        const emotionCount = afterEmotion.filter(
            emotion => emotion === item
        ).length;
        const percent = Math.round((emotionCount / emotionTotal) * 100);
        const emotion = afertLabel[idx];
        return { item, emotion, emotionCount, percent };
    });

    return { beforeData, afterData };
}
