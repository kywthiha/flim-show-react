import React, { useCallback, useEffect, useRef, useState } from "react";

export default function TimePicker({ registerProps, onChange, value }) {
  const hours = [...Array(24).keys()].map((i) => i.toString().padStart(2, "0"));
  const minutes = [...Array(60).keys()].map((i) =>
    i.toString().padStart(2, "0")
  );

  const [hour, setHour] = useState(value ? value.split(":")[0] : "");
  const [minute, setMinute] = useState(value ? value.split(":")[1] : "");
  const [time, setTime] = useState(value || "");

  const handleHourChange = (e) => {
    setHour(e.target.value);
    if (e.target.value && minute) {
      const timeValue = `${e.target.value}:${minute}`;
      if (onChange) {
        onChange(timeValue);
      }
      setTime(timeValue);
    }
  };

  const handleMinuteChange = (e) => {
    setMinute(e.target.value);
    if (hour && e.target.value) {
      const timeValue = `${hour}:${e.target.value}`;
      if (onChange) {
        onChange(timeValue);
      }
      setTime(timeValue);
    }
  };
  return (
    <div className="border-gray-300  rounded-md shadow-sm mt-1  flex gap-2 items-center">
      <input type="text" className="hidden" value={time} {...registerProps} />
      <select
        defaultValue={hour}
        onChange={handleHourChange}
        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block"
      >
        <option value="">hr</option>
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      <select
        defaultValue={minute}
        onChange={handleMinuteChange}
        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block"
      >
        <option value="">mi</option>
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
      <div>(* 24 hour format)</div>
    </div>
  );
}
