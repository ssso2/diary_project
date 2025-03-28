import { useEffect, useState } from "react";
import styles from "../../scss/components/DiaryDetail.module.scss";

export default function EmotionSelector({ category, formData, changeValue }) {
    const emotions = {
        before: [
            { id: "happy", label: "즐거움", icon: "/icon/happy.svg" },
            { id: "excited", label: "설렘", icon: "/icon/excited.png" },
            { id: "neutral", label: "평온", icon: "/icon/neutral.png" },
            { id: "angry", label: "분노", icon: "/icon/angry.png" },
            { id: "sad", label: "슬픔", icon: "/icon/sad.png" },
            { id: "unpleasant", label: "불쾌", icon: "/icon/unpleasant.png" },
        ],
        after: [
            { id: "happy2", label: "즐거움", icon: "/icon/happy2.png" },
            { id: "touched2", label: "감동", icon: "/icon/touched2.png" },
            { id: "neutral2", label: "평온", icon: "/icon/neutral2.png" },
            { id: "angry2", label: "분노", icon: "/icon/angry2.png" },
            { id: "sad2", label: "슬픔", icon: "/icon/sad2.png" },
            { id: "scared2", label: "공포", icon: "/icon/scared2.png" },
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
                        value={emotion.id}
                        checked={formData[category] === emotion.id}
                        onChange={changeValue}
                    />
                    <label htmlFor={emotion.id}>
                        <img src={emotion.icon} />
                        <span>{emotion.label}</span>
                    </label>
                </div>
            ))}
        </div>
    );
}
