import React, { useEffect, useState } from "react";

const CountdownTimer = (props) => {
  const [remainingTime, setRemainingTime] = useState(10000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(intervalId);
          props.setCanCancel(false);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
