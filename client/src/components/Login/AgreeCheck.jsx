import { useState } from "react";

import styles from "../../scss/components/AgreeCheck.module.scss";

export default function AgreeCheck({ setagree }) {
    const [allcheck, setallcheck] = useState(false);
    const [checkbox, setcheckbox] = useState({
        servicechk: false,
        privacychk: false,
    });

    // 전체 동의
    const allAgree = () => {
        setallcheck(!allcheck);
        setcheckbox({ servicechk: !allcheck, privacychk: !allcheck });
        setagree(!allcheck);
    };

    // 개별 동의
    const singleAgree = e => {
        const { id, checked } = e.target;
        const newcheckbox = { ...checkbox, [id]: checked };
        setcheckbox(newcheckbox);

        // 전체 동의 상태 업데이트
        const allChecked = Object.values(newcheckbox).every(Boolean);
        setallcheck(allChecked);
        setagree(allChecked); // 모든 체크박스가 체크되면 true, 하나라도 해제되면 false
    };

    return (
        <div className={styles.container}>
            <div className={styles.allAgreeWrapper}>
                <input
                    type="checkbox"
                    id="all"
                    checked={allcheck}
                    onChange={allAgree}
                    className={styles.checkbox}
                />
                <label htmlFor="all" className={styles.label}>
                    전체 동의하기
                </label>
            </div>
            <div className={styles.singleAgreeWrapper}>
                <div className={styles.checkboxWrapper}>
                    <input
                        type="checkbox"
                        id="servicechk"
                        checked={checkbox.servicechk}
                        onChange={singleAgree}
                        className={styles.checkbox}
                    />
                    <label htmlFor="servicechk" className={styles.label}>
                        [필수] 서비스 이용약관 동의
                    </label>
                </div>
                <div className={styles.checkboxWrapper}>
                    <input
                        type="checkbox"
                        id="privacychk"
                        checked={checkbox.privacychk}
                        onChange={singleAgree}
                        className={styles.checkbox}
                    />
                    <label htmlFor="privacychk" className={styles.label}>
                        [필수] 개인정보 처리방침 동의
                    </label>
                </div>
            </div>
        </div>
    );
}
