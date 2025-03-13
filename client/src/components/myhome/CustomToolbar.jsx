import React from "react";
import moment from "moment";

const CustomToolbar = toolbar => {
    //이전버튼
    const goToBack = () => {
        toolbar.onNavigate("PREV");
    };

    //다음버튼
    const goToNext = () => {
        toolbar.onNavigate("NEXT");
    };

    // 현재 날짜(월/연도) 한국기준 라벨
    const label = () => {
        const date = moment(toolbar.date);
        return <span>{date.format("YYYY년 M월")}</span>;
    };

    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button" onClick={goToBack}>
                    <div className="iconWrap">
                        <img src="/icon/left.svg" />
                    </div>
                </button>
                <span className="rbc-toolbar-label">{label()}</span>
                <button type="button" onClick={goToNext}>
                    <div className="iconWrap">
                        <img src="/icon/right.svg" />
                    </div>
                </button>
            </span>
        </div>
    );
};

export default CustomToolbar;
