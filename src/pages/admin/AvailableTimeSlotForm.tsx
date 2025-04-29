import axios from "axios";
import { formatLocalDateTime } from "../../util/formatLocalDateTIme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AvailableTimeSlotForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const startTime = formatLocalDateTime(startDate, startHour);
    const endTime = formatLocalDateTime(endDate, endHour);

    const token = localStorage.getItem("token");
    await axios
      .post(
        "http://localhost:8080/api/admin/available-time-slot",
        {
          startTime,
          endTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/admin", {
          state: {
            message: "Available time slot has been successfully created!",
          },
        });
      })
      .catch((error) => {
        console.log(error);
        navigate("/admin", {
          state: {
            error: "Failed to create available time slot",
          },
        });
      });
  };

  return (
    <>
      <h1>Available Time Slot Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            onChange={(e) => setStartDate(new Date(e.target.value))}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Start Hour:
          <input
            type="time"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          End Date:
          <input
            type="date"
            onChange={(e) => setEndDate(new Date(e.target.value))}
            required
          />
        </label>
        <br />
        <br />
        <label>
          End Hour:
          <input
            type="time"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AvailableTimeSlotForm;
