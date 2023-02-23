import React from "react";

const Timer = ({ time }) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    <p className="timer">
      {hours !== 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : ""}
      {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
      {seconds < 10 ? `0${seconds}` : `${seconds}`}
    </p>
  );
};

export default Timer;
