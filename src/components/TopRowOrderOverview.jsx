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

      const percentageOfOpenOrders = (totalNumberOfOpenOrders / 15) * 100;

      setAmountOfOpenOrders(totalNumberOfOpenOrders);
      setPercentageOfOpenOrders(percentageOfOpenOrders);
    }
  }, [props]);

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
              {(amountOfOpenOrders < 5 && "Roligt") ||
                (amountOfOpenOrders >= 5 && amountOfOpenOrders <= 10 && "Lidt travlt") ||
                (amountOfOpenOrders > 10 && "Travlt")}
            </p>
          </div>
          <Line
            percent={percentageOfOpenOrders}
            className="h-4 w-64 rounded-full"
            strokeColor={`${
              (amountOfOpenOrders < 5 && "#38773b") ||
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
