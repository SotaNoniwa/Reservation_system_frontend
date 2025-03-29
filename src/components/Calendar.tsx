import React, { useEffect } from "react";

type CalendarProps = {
  date: Date;
  setDate: (date: Date) => void;
  minDate: Date;
  maxDate: Date;
};

const Calendar = ({ date, setDate, minDate, maxDate }: CalendarProps) => {
  useEffect(() => {
    renderCalendar();
  }, [date]);

  const renderCalendar = () => {
    const monthYearElement = document.getElementById("monthYear");
    const calendarElement = document.getElementById("calendar");

    if (calendarElement && monthYearElement) {
      calendarElement.innerHTML = `
      <div class="weekday-header">Sun</div>
      <div class="weekday-header">Mon</div>
      <div class="weekday-header">Tue</div>
      <div class="weekday-header">Wed</div>
      <div class="weekday-header">Thu</div>
      <div class="weekday-header">Fri</div>
      <div class="weekday-header">Sat</div>
    `;

      const month = date.getMonth();
      const year = date.getFullYear();
      monthYearElement.textContent = `${year}/${month + 1}`;

      const firstDayOfWeek = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Fill empty cells before the first day of month
      for (let i = 0; i < firstDayOfWeek; i++) {
        calendarElement.innerHTML += `<div></div>`;
      }

      // Create day elements
      for (let day = 1; day <= daysInMonth; day++) {
        let currentDate = new Date(year, month, day);

        let dayElement = document.createElement("div");
        dayElement.className = "day";
        dayElement.textContent = day.toString();

        if (date && currentDate.toDateString() === date.toDateString()) {
          dayElement.classList.add("selected");
        }

        dayElement.addEventListener("click", () => {
          setDate(currentDate);
        });

        if (currentDate < minDate || currentDate > maxDate) {
          dayElement.classList.add("disabled");
        }
        calendarElement.appendChild(dayElement);
      }
    }
  };

  const handlePrevMonthClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDate(new Date(date.getFullYear(), date.getMonth(), 0));
    document.getElementById("nextMonth")?.classList.remove("disabled");
    document.getElementById("prevMonth")?.classList.add("disabled");
  };

  const handleNextMonthClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    document.getElementById("prevMonth")?.classList.remove("disabled");
    document.getElementById("nextMonth")?.classList.add("disabled");
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button
          id="prevMonth"
          onClick={handlePrevMonthClick}
          className="disabled"
        >
          &lt;
        </button>
        <span id="monthYear"></span>
        <button id="nextMonth" onClick={handleNextMonthClick}>
          &gt;
        </button>
      </div>
      <div className="calendar-grid" id="calendar">
        {/* Weekdays and Dates will be added here */}
      </div>
    </div>
  );
};

export default Calendar;
