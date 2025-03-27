import { useEffect, useState } from "react";
import styles from "../../scss/components/DiaryDetail.module.scss";

export default function EmotionSelector({ category, formData, changeValue }) {
    const emotions = {
        before: [
            { id: "happy", label: "즐거움", icon: "/icon/happy.svg" },
            { id: "excited", label: "설렘", icon: "/icon/excited.svg" },
            { id: "neutral", label: "평온", icon: "/icon/neutral.svg" },
            { id: "angry", label: "분노", icon: "/icon/angry.svg" },
            { id: "sad", label: "슬픔", icon: "/icon/sad.svg" },
            { id: "unpleasant", label: "불쾌", icon: "/icon/unpleasant.svg" },
        ],
        after: [
            { id: "happy2", label: "즐거움", icon: "/icon/happy2.svg" },
            { id: "touched2", label: "감동", icon: "/icon/touched2.svg" },
            { id: "neutral2", label: "평온", icon: "/icon/neutral2.svg" },
            { id: "angry2", label: "분노", icon: "/icon/angry2.svg" },
            { id: "sad2", label: "슬픔", icon: "/icon/sad2.svg" },
            { id: "scared2", label: "공포", icon: "/icon/scared2.svg" },
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
