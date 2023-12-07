import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase-config";

const CancelOrder = (props) => {
  const [canCancel, setCanCancel] = useState(true);
  const [elapsedTime, setElapsedTime] = useState();

  useEffect(() => {
    const timeNow = new Date().getTime();
    const timeAtOrder = props.placedAt;
    const elapsedTime = timeNow - timeAtOrder;
    setElapsedTime(elapsedTime);
  }, []);

  const handleCancelOrder = async () => {
    // Tjek om brugeren har lov til at annullere
    if (canCancel) {
      // Change status in firestore to cancelled
      const orderRef = doc(FIREBASE_DB, "orders", props.orderId);

      // To update age and favorite color:
      await updateDoc(orderRef, {
        status: "cancelled",
      });

      // Delete the orderId from localStorage preventing access to the page
      localStorage.removeItem("currentOrder");
    } else {
      return;
    }
  };

  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Determine remaining time for the countdown
  const initialRemainingTime = Math.max(fiveMinutes - elapsedTime, 0);

  return (
    <div className="w-full rounded-xl overflow-clip">
      <div
        onClick={handleCancelOrder}
        className={`flex items-center gap-2 justify-center p-4 bg-red text-white text-lg font-semibold cursor-pointer select-none ${
          !canCancel && "!bg-cancelGrey"
        }`}
      >
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
      <div className={`flex justify-center gap-1 p-1 bg-mainGrey ${!canCancel && "!bg-dark text-white"}`}>
        <>
          <p>Annuller inden:</p>
          {elapsedTime && (
            <CountdownTimer
              initialRemainingTime={initialRemainingTime}
              canCancel={canCancel}
              setCanCancel={setCanCancel}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default CancelOrder;
