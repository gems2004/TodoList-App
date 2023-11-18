import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
function CalenderContainer({ calender }) {
  return (
    <div className={calender ? "" : "visually-hidden"}>
      <Calendar className="border-0 calendar-container" />
    </div>
  );
}

export default CalenderContainer;
