import React, { useEffect, useState } from "react";

const PickupTimer = (props) => {
  const [timeLeft, setTimeLeft] = useState(props.remainingTime);

  useEffect(() => {
    setTimeLeft(props.remainingTime); // Set initial time

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props.remainingTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}t ${minutes}m`;
  };

  return <b>{formatTime(timeLeft)}</b>;
};

export default PickupTimer;
