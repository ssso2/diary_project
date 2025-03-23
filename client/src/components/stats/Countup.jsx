import { useEffect, useState } from "react";

// 숫자 카운팅 애니메이션
export default function CountUp({ target }) {
    const [count, setCount] = useState(0); // 실제 업데이트 상태

    useEffect(() => {
        let start = 0;
        const duration = 1000; // 지속시간
        const increment = target / (duration / 16);
        //한 번 움직일 때 얼만큼 올라갈지 target 28이면 1초에 16ms 간격 총 62번 실행

        const counter = setInterval(() => {
            start += increment; // 매 프레임마다 증가
            if (start >= target) {
                start = target; // 목표값 도달하면 증가 정지
                clearInterval(counter); // 애니메이션 종료
            }
            setCount(Math.floor(start));
        }, 16); // 16ms 간격으로 실행

        return () => clearInterval(counter); // 컴포넌트 언마운트 clear
    }, [target]); // target 값이 바뀔 때마다 재실행

    return <p className="monthNumber">{count}개</p>;
}
