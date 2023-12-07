import React, { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const CountdownTimer = (props) => {
  const [remainingTime, setRemainingTime] = useState(props.initialRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(intervalId);
          setCanCancel();
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime]);

  const setCanCancel = async () => {
    // Change status in firestore to cancelled
    const orderRef = doc(FIREBASE_DB, "orders", props.orderId);

    // To update age and favorite color:
    await updateDoc(orderRef, {
      canCancel: false,
    });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <b>{formatTime(props.canCancel ? remainingTime : 0)}</b>
    </div>
  );
};

export default CountdownTimer;
