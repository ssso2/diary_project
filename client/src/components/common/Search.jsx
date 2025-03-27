import { useState } from "react";

export default function Search({ input, setInput, setKeyword }) {
    const searchGo = () => {
        // console.log("입력값", input);
        setKeyword(input);
        alert("검색이 완료되었습니다.");
    };
    return (
        <div className="searchWrap">
            <input
                className="bar"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="제목을 입력해주세요."
            />
            <button type="button" onClick={searchGo} className="searchbtn">
                <img src="/icon/search.svg" alt="돋보기" title="검색" />
            </button>
        </div>
    );
}
