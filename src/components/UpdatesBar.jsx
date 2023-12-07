import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../firebase-config";

const UpdatesBar = (props) => {
  const [updates, setUpdates] = useState();

  // Get updates from firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(FIREBASE_DB, "orders", props.orderId), (doc) => {
      setUpdates(doc.data().updates);
      console.log(doc.data());
    });
  }, []);

  const convertTimestamp = (stamp) => {
    let unixTimestamp = stamp;

    // Convert to milliseconds and
    // then create a new Date object
    let dateObj = new Date(unixTimestamp * 1000);

    // Get hours from the timestamp
    let hours = dateObj.getHours();

    // Get minutes part from the timestamp
    let minutes = dateObj.getMinutes();

    let formattedTime = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");

    return formattedTime;
  };

  return (
    <div className="flex flex-col-reverse">
      {updates?.map((updt, key) => {
        return (
          <div key={key} className="flex items-start gap-3">
            <div className="flex flex-col-reverse">
              <div className="flex flex-col items-center">
                {updt.type !== "cancel" ? (
                  <>
                    {key + 1 !== updates.length ? (
                      <div className="bg-dark w-5 h-5 rounded-full"></div>
                    ) : (
                      <div className="bg-primary w-5 h-5 rounded-full"></div>
                    )}
                  </>
                ) : (
                  <div className="bg-red w-5 h-5 rounded-full"></div>
                )}

                {key !== 0 && <div className="border-2 border-dark h-10"></div>}
              </div>
            </div>
            <div className="flex justify-between place-items-start w-full">
              <p className="font-semibold text-md leading-5">{updt.context}</p>
              <p>{convertTimestamp(updt.time)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpdatesBar;
