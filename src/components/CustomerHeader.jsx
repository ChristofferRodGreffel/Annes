import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import CustomerNavigation from "./CustomerNavigation";

const CustomerHeader = (props) => {
  const navigate = useNavigate();

  const handleOpenNavigation = () => {
    const customerNav = document.querySelector("#customerNav");
    customerNav.style.left = "0";
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <CustomerNavigation />
      <header className="flex justify-around items-center w-full pt-5">
        {props.iconLeft && (
          <i
            onClick={props.nav == true ? handleOpenNavigation : handleGoBack}
            className={`${props.iconLeft} text-3xl p-2 cursor-pointer`}
          ></i>
        )}

        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-40" />
        </Link>
        {props.iconRight && <i className={`${props.iconRight} text-3xl p-2 cursor-pointer`}></i>}
      </header>
    </>
  );
};

export default CustomerHeader;
