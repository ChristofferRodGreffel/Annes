import React, { useEffect, useState } from "react";
import { Line } from "rc-progress";

function TopRowOrderOverview(props) {
  const [date, setDate] = useState(new Date());

  const [amountOfOpenOrders, setAmountOfOpenOrders] = useState(0);

  const [percentageOfOpenOrders, setPercentageOfOpenOrders] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (props) {
      let AmountOfRecivedOrders = props.recivedOrders?.length || 0;
      let AmountOfAccepteddOrders = props.acceptedOrders?.length || 0;
      let AmountOfReadyOrders = props.readyOrders?.length || 0;

      const totalNumberOfOpenOrders = AmountOfRecivedOrders + AmountOfAccepteddOrders + AmountOfReadyOrders;

      const percentageOfOpenOrders = (totalNumberOfOpenOrders / props.totalOrders?.length) * 100;

      setAmountOfOpenOrders(totalNumberOfOpenOrders);
      setPercentageOfOpenOrders(percentageOfOpenOrders);
    }
  }, [props]);

  return (
    <>
      <div className="flex flex-col-reverse gap-2 w-64 md:w-full md:flex-row md:justify-between mb-8">
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
            <p>{amountOfOpenOrders > 1 ? `${amountOfOpenOrders} Åbne ordre` : `${amountOfOpenOrders} Åben ordre`}</p>
            <p>{amountOfOpenOrders > 4 ? "Travlt" : "Roligt"}</p>
          </div>
          <Line percent={percentageOfOpenOrders} className="h-4 w-64 rounded-full" strokeColor="#D7C310" />
        </div>
        <div>
          <p className="text-4xl font-bold text-primary">{date.toLocaleTimeString("en-GB")}</p>
        </div>
      </div>
    </>
  );
}

export default TopRowOrderOverview;
