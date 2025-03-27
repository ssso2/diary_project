import { useState } from "react";
import Calendar from "react-calendar";
import { formatNewDate } from "../../utils/Validation";

import "react-calendar/dist/Calendar.css";
import "../../scss/reactCalendar.scss";

export default function Datepicker({ day, setDay, setCalendar }) {
    const colorClassName = ({ date }) => {
        if (date.getDay() === 6) {
            return "saturday";
        }
        if (date.getDay() === 0) {
            return "sunday";
        }
        return;
    };
    const clickDay = date => {
        // console.log("클릭", date);
        setDay(formatNewDate(date));
        setCalendar(false);
        // console.log("날짜업데이트결과", day);
    };
    return (
        <div>
            <Calendar
                onChange={clickDay}
                value={day}
                // dateFormat="yyyy-MM-dd"
                showNeighboringMonth={false}
                tileClassName={colorClassName}
            />
        </div>
    );
}
