import React from "react";

const StatusBar = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center self-start">
        <div
          className={`h-7 w-7 rounded-full bg-grey flex justify-center items-center text-white ${
            props.status !== "pending" && "bg-green"
          }`}
        >
          {props.status !== "pending" && <i className="fa-solid fa-check text-lg"></i>}
        </div>
        <hr
          className={`border-2 border-grey w-16 ${
            props.status !== "pending" && props.status !== "recieved" && "border-green"
          }`}
        />
      </div>
      <div className="flex items-center">
        <div
          className={`h-7 w-7 rounded-full bg-grey flex justify-center items-center text-white ${
            props.status !== "recieved" && props.status !== "pending" && "bg-green"
          } `}
        >
          {props.status !== "recieved" && props.status !== "pending" && <i className="fa-solid fa-check text-lg"></i>}
        </div>
        <hr
          className={`border-2 border-grey w-16 ${
            props.status !== "pending" && props.status !== "recieved" && props.status !== "accepted" && "border-green"
          }`}
        />
      </div>
      <div className="flex items-center">
        <div
          className={`h-7 w-7 rounded-full bg-grey flex justify-center items-center text-white ${
            props.status !== "recieved" && props.status !== "pending" && props.status !== "accepted" && "bg-green"
          } `}
        >
          {props.status !== "recieved" && props.status !== "pending" && props.status !== "accepted" && (
            <i className="fa-solid fa-check text-lg"></i>
          )}
        </div>
        <hr
          className={`border-2 border-grey w-16 ${
            props.status !== "pending" &&
            props.status !== "recieved" &&
            props.status !== "accepted" &&
            props.status !== "ready" &&
            "border-green"
          }`}
        />
      </div>
      <div className="flex items-center">
        <div
          className={`h-7 w-7 rounded-full bg-grey flex justify-center items-center text-white ${
            props.status !== "recieved" &&
            props.status !== "pending" &&
            props.status !== "accepted" &&
            props.status !== "ready" &&
            "bg-green"
          } `}
        >
          {props.status !== "recieved" &&
            props.status !== "pending" &&
            props.status !== "accepted" &&
            props.status !== "ready" && <i className="fa-solid fa-check text-lg"></i>}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
