import { useEffect, useState } from "react";
import { type Course } from "../../lib/Course";
import axios from "axios";
import { findAllCourses } from "../../util/findAllCourses";

type ReservationFormProps = {
  courses: Course[];
};

const ReservationForm = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [courseId, setCourseId] = useState<number | null>(null);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numOfCustomers, setNumOfCustomers] = useState(0);

  useEffect(() => {
    findAllCourses().then((courses) => setCourses(courses));
  }, []);

  useEffect(() => {
    const startHour = 10;
    const endHour = 18;
    let timeOptions: string[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes of [0, 15, 30, 45]) {
        let time = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}`;
        timeOptions.push(time);
      }
    }

    let lastTime = `${String(endHour).padStart(2, "0")}:${String(0).padStart(
      2,
      "0"
    )}`;
    timeOptions.push(lastTime);

    const startTimeInput = document.getElementById("startTime");
    if (startTimeInput) {
      timeOptions.forEach((time) => {
        let option = document.createElement("option");
        option.text = time;
        startTimeInput.appendChild(option);
      });
    }
  }, []);

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseId(Number(event.target.value));
  };

  return (
    <>
      <h3>Make a reservation</h3>

      <form method="post" action="#">
        <select onChange={handleCourseChange}>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <div className="calendar-container">
          <div className="calendar-header">
            <button id="prevMonth">&lt;</button>
            <span id="monthYear"></span>
            <button id="nextMonth">&gt;</button>
          </div>
          <div className="calendar-grid" id="calendar">
            {/* Weekdays will be added here */}
            <div className="weekday-header">Sun</div>
            <div className="weekday-header">Mon</div>
            <div className="weekday-header">Tue</div>
            <div className="weekday-header">Wed</div>
            <div className="weekday-header">Thu</div>
            <div className="weekday-header">Fri</div>
            <div className="weekday-header">Sat</div>
            {/* Dates will be generated here */}
          </div>
        </div>
        <br />
        <br />
        Start time: <select id="startTime"></select>
        <br />
        <br />
        Number of people: <input type="number" min="1" defaultValue="1" />
        <br />
        <br />
        Note: <input type="text" />
        <br />
        <br />
        <input type="hidden" name="startTime" id="selectedDateTimeInput" />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default ReservationForm;
