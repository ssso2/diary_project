import { useEffect, useState } from "react";
import styles from "../../scss/components/DiaryDetail.module.scss";

export default function EmotionSelector({ category }) {
    const emotions = {
        before: [
            { id: "happy", label: "즐거움", icon: "/icon/happy.svg" },
            { id: "excited", label: "설렘", icon: "/icon/excited.svg" },
            { id: "neutral", label: "중립", icon: "/icon/neutral.svg" },
            { id: "angry", label: "분노", icon: "/icon/angry.svg" },
            { id: "sad", label: "슬픔", icon: "/icon/sad.svg" },
            { id: "unpleasant", label: "불쾌감", icon: "/icon/unpleasant.svg" },
        ],
        after: [
            { id: "happy", label: "즐거움", icon: "/icon/happy.svg" },
            { id: "touched", label: "감동", icon: "/icon/touched.svg" },
            { id: "neutral", label: "중립", icon: "/icon/neutral.svg" },
            { id: "angry", label: "분노", icon: "/icon/angry.svg" },
            { id: "sad", label: "슬픔", icon: "/icon/sad.svg" },
            { id: "scared", label: "공포", icon: "/icon/scared.svg" },
        ],
    };
    const emotionList =
        category === "before" ? emotions.before : emotions.after;
    const [selectedEmotion, setselectedEmotion] = useState(null);
    const emotionChange = emotionId => {
        setselectedEmotion(emotionId);
        // onEmotionChange(emotionId);
    };
    return (
        <div className={styles.radioContainer}>
            {emotionList.map(emotion => (
                <div key={emotion.id} className={styles.radioWrap}>
                    <input
                        type="radio"
                        id={emotion.id}
                        name={category}
                        checked={selectedEmotion === emotion.id}
                        onChange={() => setselectedEmotion(emotion.id)}
                    />
                    <label htmlFor={emotion.id}>
                        <img src={emotion.icon} />
                        {emotion.label}
                    </label>
                </div>
            ))}
        </div>
    );
}
