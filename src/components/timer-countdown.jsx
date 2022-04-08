import React from "react";

const TimerCountdown = ({ value, type }) => {
  return (
    <div className="timer-component">
      <div className="timer-box">{value}</div>
      <div className="timer-label">{type}</div>
    </div>
  );
};

export default TimerCountdown;
