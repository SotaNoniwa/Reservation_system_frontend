import React, { useEffect } from "react";

type TimeOptionsProps = {
  startHour: number;
  endHour: number;
  setTime: (time: string) => void;
};

const TimeOptions = ({ startHour, endHour, setTime }: TimeOptionsProps) => {
  useEffect(() => {
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
  }, [startHour, endHour]);

  return (
    <select id="startTime" onChange={(e) => setTime(e.target.value)}></select>
  );
};

export default TimeOptions;
