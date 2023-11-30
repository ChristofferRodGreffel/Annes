import React from "react";
import { Link } from "react-router-dom";

const BackButtonWithArrow = (props) => {
  return (
    <Link to={props.linkTo} className="flex items-center gap-2 font-medium text-lg mb-10">
      <i className="fa-solid fa-arrow-left"></i>
      {props.linkText}
    </Link>
  );
};

export default BackButtonWithArrow;
