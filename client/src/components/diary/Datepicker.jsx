import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../scss/reactCalendar.scss";

export default function Datepicker({ day, setDay, setCalendar }) {
    // const [date, setDate] = useState(new Date());
    // console.log(new Date());
    // if (!day) {
    //     console.log("date undefined");
    //     return null;
    // }
    const colorClassName = ({ date }) => {
        if (date.getDay() === 6) {
            return "saturday";
        }
        if (date.getDay() === 0) {
            return "sunday";
        }
        return;
    };
    const clickDay = e => {
        setDay(e);
        setCalendar(false);
    };
    return (
        <div>
            <Calendar
                onChange={clickDay}
                value={day}
                // calendarType="gregory"
                showNeighboringMonth={false}
                tileClassName={colorClassName}
            />
            {/* {date?.toISOString().split("T")[0]} */}
        </div>
    );
}
