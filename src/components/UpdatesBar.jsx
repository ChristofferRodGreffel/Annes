import React from "react";

const UpdatesBar = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center">
        <p>BLA BLA BLA</p>
      </div>

      <div className="flex items-center">
        <p>BLA BLA BLA</p>
      </div>

      <div className="flex items-center">
        <p>BLA BLA BLA</p>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <div
            className={`h-7 w-7 rounded-full bg-grey flex justify-center items-center text-white after:content-['Afhentet'] after:text-dark after:absolute after:text-sm after:bottom-8 after:font-medium ${
              props.status !== "recieved" &&
              props.status !== "pending" &&
              props.status !== "accepted" &&
              props.status !== "ready" &&
              "!bg-green"
            } `}
          >
            {props.status !== "recieved" &&
              props.status !== "pending" &&
              props.status !== "accepted" &&
              props.status !== "ready" && <i className="fa-solid fa-check text-lg"></i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesBar;
