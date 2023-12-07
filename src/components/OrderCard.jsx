import React from "react";

const OrderCard = (props) => {
  console.log(props.order);
  return (
    <>
      {props.order && (
        <div className="w-64">
          <div className="flex flex-col justify-between bg-mainGrey  h-64 rounded-lg px-4 py-3 relative">
            <div className="flex justify-between">
              <div>
                <h1 className="font-bold text-lg rounded-xl">Ordre #{props.orderNo}</h1>
                <div className="text-sm font-medium leading-tight font pt-0.5">
                  <p>{props.order.pickup.date}, 21:00</p>
                  <p>{props.order.customerInfo.name}</p>
                </div>
              </div>
              <i className="fa-solid fa-print text-3xl text-grey cursor-pointer"></i>
            </div>
            <div className="flex flex-col items-center m-auto w-full">
              <p className="font-bold text-4xl border-b-2 border-primary">1 stk.</p>
              <p className="font-medium text-xl">13:45</p>
            </div>
            <div>
              <p className="font-bold text-red text-center text-lg">OBS: 2 stk. GF</p>
            </div>
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
