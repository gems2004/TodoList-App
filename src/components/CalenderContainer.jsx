import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getFullDate } from "../features/date/dateSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
function CalenderContainer({ calender }) {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const dateTime = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    dateIso: date.toISOString().substring(0, 10),
  };
  useEffect(() => {
    dispatch(
      getFullDate({
        year: dateTime.year,
        month: dateTime.month,
        day: dateTime.day,
        isoDate: dateTime.dateIso,
      })
    );
  }, [date]);
  return (
    <div className={calender ? "" : "visually-hidden"}>
      <Calendar
        onChange={setDate}
        value={date}
        className="border-0 calendar-container"
      />
    </div>
  );
}

export default CalenderContainer;
