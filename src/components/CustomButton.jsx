import React from "react";

const CustomButton = (props) => {
  return (
    <button
      className="flex justify-center items-center gap-2 bg-primary rounded-lg p-2 text-white font-semibold"
      onClick={props.function}
      type="button"
    >
      {props.icon && <i className={`${props.icon} text-lg`}></i>}
      {props.title}
    </button>
  );
};

export default CustomButton;
