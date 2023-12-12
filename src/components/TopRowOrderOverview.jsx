import React, { useEffect, useState } from "react";
import { Line } from "rc-progress";
import { collection, onSnapshot, query } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase-config";

function TopRowOrderOverview(props) {
  const [date, setDate] = useState(new Date());

  const [amountUntilBusy, setAmountUntilBusy] = useState(0)

  const [amountOfOpenOrders, setAmountOfOpenOrders] = useState(0);
  const [percentageOfOpenOrders, setPercentageOfOpenOrders] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getAmountUntilBusy = async () => {
      const q = query(collection(FIREBASE_DB, "admin-settings"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {

        querySnapshot.forEach((doc) => {
          if (doc.data().amount) {
            setAmountUntilBusy(doc.data().amount)
          }
        })
      });
    };
    getAmountUntilBusy();
  }, []);

  useEffect(() => {
    if (props) {
      let AmountOfRecivedOrders = props.recivedOrders?.length || 0;
      let AmountOfAccepteddOrders = props.acceptedOrders?.length || 0;
      let AmountOfReadyOrders = props.readyOrders?.length || 0;

      const totalNumberOfOpenOrders = AmountOfRecivedOrders + AmountOfAccepteddOrders + AmountOfReadyOrders;

      const percentageOfOpenOrders = (totalNumberOfOpenOrders / amountUntilBusy) * 100;

      setAmountOfOpenOrders(totalNumberOfOpenOrders);
      setPercentageOfOpenOrders(percentageOfOpenOrders);
    }
  }, [props, amountUntilBusy]);

  return (
    <>
      <div className="flex flex-col-reverse flex-wrap gap-8 w-64 md:w-full md:flex-row md:justify-between md:gap-2 mb-8">
        <div>
          <input
            type="text"
            name="searchForOrder"
            value={props.filteredOrders}
            onChange={(e) => {
              props.handleShowFilteredOrders(e);
            }}
            id="searchForOrderId"
            placeholder="Søg efter ordre..."
          ></input>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between font-bold">
            <p>{amountOfOpenOrders > 1 ? `${amountOfOpenOrders} Åbne ordre` : `${amountOfOpenOrders} Åbne ordre`}</p>
            <p>
              {((amountOfOpenOrders / amountUntilBusy ) * 100 < 33 && "Roligt") ||
                ( (amountOfOpenOrders / amountUntilBusy) * 100 > 33 && (amountOfOpenOrders / amountUntilBusy) * 100 < 66 && "Lidt travlt") ||
                ( (amountOfOpenOrders / amountUntilBusy) * 100 > 66 && "Travlt")}
            </p>
          </div>
          <Line
            percent={percentageOfOpenOrders}
            className="h-4 w-64 rounded-full"
            strokeColor={`${(amountOfOpenOrders < 5 && "#38773b") ||
              (amountOfOpenOrders >= 5 && amountOfOpenOrders <= 10 && "#D7C310") ||
              (amountOfOpenOrders > 10 && "#b72626")
              }`}
          />
        </div>
        <div className="text-center w-44">
          <p className="text-4xl font-bold text-primary font-mono">{date.toLocaleTimeString("en-GB")}</p>
        </div>
      </div>
    </>
  );
}

export default TopRowOrderOverview;
