import React, { useEffect, useState } from "react";
import { timestampConvert } from "../helperfunctions/TimestampConvert";

const OrderCard = (props) => {
  const [remainingTime, setRemainingTime] = useState();

  useEffect(() => {
    const currentTime = new Date().getTime();
    const pickupTimestamp = props.order.pickup.time;
    let pickupTime = new Date(pickupTimestamp * 1000);

    const timeRemaining = pickupTime - currentTime;
    console.log(timeRemaining);
  }, []);

  const getTotalAmount = () => {
    let totalAmountFromBasket = 0;
    props.order.order.forEach((subData) => (totalAmountFromBasket += subData.amount));
    return totalAmountFromBasket;
  };

  const checkPickupTime = (time) => {
    const today = new Date().toLocaleDateString("en-GB");

    const dateStamp = props.order.pickup.date.seconds;
    const date = new Date(dateStamp * 1000).toLocaleDateString("en-GB");

    let pickup;

    if (date !== today) {
      pickup = date;
      return pickup;
    } else {
      pickup = props.order.pickup.time;
      return pickup;
    }
  };

  return (
    <>
      {props.order && (
        <div className="w-64">
          <div className="flex flex-col justify-between bg-mainGrey  h-64 rounded-lg px-4 py-3 relative">
            <div className="flex justify-between">
              <div>
                <h1 className="font-bold text-lg rounded-xl">Ordre #{props.order.orderNo}</h1>
                <div className="text-sm font-medium leading-tight font pt-0.5">
                  <p>{timestampConvert(props.order.orderPlacedAt.seconds, "stampToDateAndHourMinute")}</p>
                  <p>{props.order.customerInfo.name}</p>
                </div>
              </div>
              <i className="fa-solid fa-print text-3xl text-grey cursor-pointer"></i>
            </div>
            <div className="flex flex-col items-center m-auto w-full">
              <p className="font-bold text-4xl border-b-2 border-primary">{getTotalAmount()} stk.</p>
              <p className="font-medium text-xl">{checkPickupTime()}</p>
            </div>
            {/* <div>
              <p className="font-bold text-red text-center text-lg">OBS: 2 stk. GF</p>
            </div> */}
          </div>
          <div className="flex items-center justify-center relative bottom-3 bg-primary text-white text-center -z-10 pt-4 pb-2 rounded-b-lg">
            <p>
              Afhentes om: <b>1t 30m</b>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
