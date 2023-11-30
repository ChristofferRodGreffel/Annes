import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col bg-mainGrey w-72 fixed h-screen">
      <Link to={"/LandingPage"} className="m-auto mt-10 mb-20">
        <img src={logo} alt="logo" />
      </Link>

      <nav className="flex justify-between flex-col h-full">
        <div className="flex flex-col gap-5">
          <Link
            to={"/ordrer"}
            className="flex gap-3 items-center font-medium text-xl p-4 pl-10 active:bg-primary active:text-white"
          >
            <i className="fa-solid fa-house text-xl"></i>
            Ordre oversigt
          </Link>
          <Link
            to={"#"}
            className="flex gap-3 items-center font-medium text-xl p-4 pl-10 active:bg-primary active:text-white"
          >
            <i className="fa-solid fa-clock-rotate-left text-xl"></i>
            Ordre historik
          </Link>
          <Link
            to={"#"}
            className="flex gap-3 items-center font-medium text-xl p-4 pl-10 active:bg-primary active:text-white"
          >
            <i className="fa-solid fa-chart-column text-xl"></i>
            Statistik
          </Link>
          <Link
            to={"#"}
            className="flex gap-3 items-center font-medium text-xl p-4 pl-10 active:bg-primary active:text-white"
          >
            <i className="fa-solid fa-utensils text-xl"></i>
            Menu
          </Link>
          <Link
            to={"#"}
            className="flex gap-3 items-center font-medium text-xl p-4 pl-10 active:bg-primary active:text-white"
          >
            <i className="fa-solid fa-sliders text-xl"></i>
            Menu
          </Link>
        </div>
        <div className="justify-self-end">
          <Link to={"#"} className="flex gap-3 items-center font-medium text-xl p-4 pl-10 mb-5">
            <i className="fa-solid fa-arrow-right-from-bracket text-xl"></i>
            Log ud
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
