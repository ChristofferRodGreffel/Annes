import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

const CancelOrder = (props) => {
  const [canCancel, setCanCancel] = useState(true);
  const [elapsedTime, setElapsedTime] = useState();

  useEffect(() => {
    const timeNow = new Date().getTime();
    const timeAtOrder = props.placedAt;
    const elapsedTime = timeNow - timeAtOrder;
    setElapsedTime(elapsedTime);
    if (elapsedTime >= 300000) {
      setCanCancel(false);
      return;
    }
  }, []);

  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Get the stored order timestamp or set a new one if it doesn't exist
  const orderTimestamp = localStorage.getItem("OrderTimeStamp") || new Date().getTime();
  localStorage.setItem("OrderTimeStamp", orderTimestamp);

  // Determine remaining time for the countdown
  const initialRemainingTime = Math.max(fiveMinutes - elapsedTime, 0);

  return (
    <div className="w-full rounded-xl overflow-clip">
      <div className="flex items-center gap-2 justify-center p-4 bg-red text-white text-lg font-semibold">
        {canCancel ? (
          <>
            <p>Annuller bestilling</p>
            <i className="fa-solid fa-circle-xmark text-2xl"></i>
          </>
        ) : (
          <>
            <p>Kan ikke længere annulleres</p>
          </>
        )}
      </div>
      <div className="flex justify-center gap-1 p-1 bg-mainGrey">
        {canCancel ? (
          <>
            <p>Annuller inden:</p>
            {elapsedTime && <CountdownTimer initialRemainingTime={initialRemainingTime} />}
          </>
        ) : (
          <>
            <p>
              Annuller inden: <b>0m 0s</b>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CancelOrder;
