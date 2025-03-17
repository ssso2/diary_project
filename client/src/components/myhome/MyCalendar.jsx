import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../scss/MyCalendar.scss";
import CustomToolbar from "./CustomToolbar";
import CustomDateHeader from "./CustomShowMore";
import CustomWeekday from "./CustomShowMore";
import "../../scss/MyCalendar.scss";
import CustomShowMore from "./CustomShowMore";
import useDiaryStore from "../../store/useDiaryStore";
import { useNavigate } from "react-router-dom";

//최상위
moment.locale("ko");
const localizer = momentLocalizer(moment);

export default function MyCalendar() {
    const navigate = useNavigate();

    // 다이어리 데이터 불러오기
    const { diaryData } = useDiaryStore();

    //기존
    const CalendarEvents = diaryData.map(event => ({
        ...event,
        title: event.title,
        start: new Date(event.date),
        end: new Date(event.date),
        allDay: true,
    }));

    const diaryId = diaryData.findIndex(diary => diary.id);

    //상세페이지 이벤트 params 넣기
    const ClickEvent = event => navigate(`/home/detail/${event.id}`);

    return (
        <div className="myCalendarWrapper">
            <Calendar
                localizer={localizer} // 로컬라이저 설정
                events={CalendarEvents} // 이벤트 배열 전달
                // startAccessor="start" // 시작 날짜 필드 지정
                // endAccessor="end" // 종료 날짜 필드 지정
                defaultView="month" // 초기 뷰 (월별)
                views={["month"]} // 월만 보기
                style={{ minHeight: "600px", height: "100%" }}
                components={{
                    toolbar: CustomToolbar, //툴바
                    showMore: CustomShowMore, // 다이어리 전체로 이동
                }}
                onSelectEvent={ClickEvent}
            />
            {/* {CalendarEvents.length === 0 && (
                <p className="emptyMsg">작성된 다이어리가 없습니다.</p>
            )} */}
        </div>
    );
}
