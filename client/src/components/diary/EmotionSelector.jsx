import { useEffect, useState } from "react";
import styles from "../../scss/components/DiaryDetail.module.scss";

export default function EmotionSelector({ category }) {
    const [selectedEmotion, setselectedEmotion] = useState(null);
    const emotions = {
        before: [
            { id: "happy", label: "즐거움", icon: "/icon/happy.svg" },
            { id: "excited", label: "설렘", icon: "/icon/happy.svg" },
            { id: "neutral", label: "평온", icon: "/icon/happy.svg" },
            { id: "angry", label: "분노", icon: "/icon/happy.svg" },
            { id: "sad", label: "슬픔", icon: "/icon/happy.svg" },
            { id: "unpleasant", label: "불쾌감", icon: "/icon/happy.svg" },
        ],
        after: [
            { id: "happy", label: "즐거움", icon: "/icon/sad.svg" },
            { id: "touched", label: "감동", icon: "/icon/sad.svg" },
            { id: "neutral", label: "평온", icon: "/icon/sad.svg" },
            { id: "angry", label: "분노", icon: "/icon/sad.svg" },
            { id: "sad", label: "슬픔", icon: "/icon/sad.svg" },
            { id: "scared", label: "공포", icon: "/icon/sad.svg" },
        ],
    };
    const emotionList =
        category === "before" ? emotions.before : emotions.after;

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
