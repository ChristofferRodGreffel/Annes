import React, { useEffect, useState } from "react";

const CountdownTimer = ({ initialRemainingTime }) => {
  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000);

      if (remainingTime <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <b>{formatTime(remainingTime)}</b>
    </div>
  );
};

export default CountdownTimer;
