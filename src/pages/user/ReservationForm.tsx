import { useEffect, useState } from "react";
import { type Course } from "../../lib/Course";
import axios from "axios";
import { findAllCourses } from "../../util/findAllCourses";
import "../../styles/Calender.css";
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/Calendar";
import TimeOptions from "../../components/TimeOptions";

type formData = {
  userId: number | null;
  courseId: number;
  dateTime: string;
  durationMinutes: number;
  numOfCustomers: number;
  note: string;
};

const ReservationForm = () => {
  const navigate = useNavigate();

  // Set reservable day range from 2 days after today to 31+2 days after today
  const offsetDays = 2;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + offsetDays);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 31 + offsetDays);

  // Set reservable hour range
  const startHour = 10;
  const endHour = 18;

  const defaultDateTime = new Date(minDate);
  defaultDateTime.setHours(startHour, 0, 0, 0);

  // For fetching courses from DB & displaying courses in UI
  const [courses, setCourses] = useState<Course[]>([]);

  const [selectedDateTime, setSelectedDateTime] = useState(defaultDateTime);

  const [formData, setFormData] = useState<formData>({
    userId: null,
    courseId: 1,
    dateTime: "",
    durationMinutes: 120,
    numOfCustomers: 1,
    note: "",
  });

  // time should be in "hh:mm" format
  const setTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const tempDateTime = new Date(selectedDateTime);
    tempDateTime.setHours(hour, minute);
    setSelectedDateTime(tempDateTime);
    console.log("setTime() is called!");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/reservation",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      if (response.data == null) {
        navigate("/user", {
          state: {
            error: "The reservation time is already taken",
          },
        });
      } else {
        navigate("/user", {
          state: {
            message: "Reservation has been successfully created!",
          },
        });
      }
    } catch (error) {
      console.error(error);
      navigate("/user", {
        state: {
          error: "Failed to create reservation",
        },
      });
    }
  };

  useEffect(() => {
    findAllCourses().then((courses) => setCourses(courses));
  }, []);

  useEffect(() => {
    const year = selectedDateTime.getFullYear();
    const month = String(selectedDateTime.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDateTime.getDate()).padStart(2, "0");
    const hour = String(selectedDateTime.getHours()).padStart(2, "0");
    const minute = String(selectedDateTime.getMinutes()).padStart(2, "0");

    // yyyy-mm-ddThh:mm:ss
    const reservationTime = `${year}-${month}-${day}T${hour}:${minute}`;

    setFormData((prev) => ({
      ...prev,
      dateTime: reservationTime,
    }));

    console.log("useEffect() gets called!");
    console.log("dateTime: " + selectedDateTime);
  }, [selectedDateTime]);

  useEffect(() => {
    console.log("formData: " + formData.dateTime);
  }, [formData.dateTime]);

  return (
    <>
      <h3>Make a reservation</h3>

      <form method="POST" onSubmit={handleFormSubmit}>
        <select name="courseId" onChange={handleInputChange}>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Calendar
          date={selectedDateTime}
          setDate={setSelectedDateTime}
          minDate={minDate}
          maxDate={maxDate}
        />
        <br />
        <br />
        Start time:{" "}
        <TimeOptions
          startHour={startHour}
          endHour={endHour}
          setTime={setTime}
        />
        <br />
        <br />
        Number of people:{" "}
        <input
          type="number"
          min="1"
          name="numOfCustomers"
          value={formData.numOfCustomers}
          onChange={handleInputChange}
        />
        <br />
        <br />
        Note:{" "}
        <input
          type="text"
          name="note"
          value={formData.note}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ReservationForm;
