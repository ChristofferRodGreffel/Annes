import React from "react";

const OrderButton = (props) => {
  return (
    <button
      className={`border-2 rounded-lg text-dark px-8 py-2 w-full font-semibold ${
        props.green ? "border-green bg-lightGreen" : "border-red bg-lightRed"
      }`}
      onClick={props.function}
    >
      {props.text}
    </button>
  );
};

export default OrderButton;
