import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FIREBASE_AUTH } from "../../firebase-config";
import { signOut } from "firebase/auth";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSideBarOpen] = useState(true);

  const handleUserLogout = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        // Sign-out successful.
        navigate("/log-ind");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const handleOpenCloseMenu = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      <div
      onMouseOver={() => {setSideBarOpen(true)}}
        id="adminMenu"
        className={`flex flex-col bg-mainGrey sticky left-0 top-0 z-[999] h-[100dvh] drop-shadow-lg ${
          sidebarOpen ? "min-w-sidebarMinWidth" : "w-0"
        }`}
      >
        <NavLink to={"/ordre-oversigt"} className="m-auto mt-10 mb-16">
          <img className="w-48" src={logo} alt="logo" />
        </NavLink>

        <nav className="flex justify-between flex-col h-full overflow-hidden">
          <div className="flex flex-col">
            <NavLink
              to={"/ordre-oversigt"}
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center font-medium text-lg p-4 pl-10 bg-primary text-white"
                  : "flex gap-3 items-center font-medium text-lg p-4 pl-10"
              }
            >
              <i className="fa-solid fa-house text-lg"></i>
              Ordre oversigt
            </NavLink>
            <NavLink
              to={"/ordre-historik"}
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center font-medium text-lg p-4 pl-10 bg-primary text-white"
                  : "flex gap-3 items-center font-medium text-lg p-4 pl-10"
              }
            >
              <i className="fa-solid fa-clock-rotate-left text-lg"></i>
              Ordre historik
            </NavLink>
            <NavLink
              to={"/statistik"}
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center font-medium text-lg p-4 pl-10 bg-primary text-white"
                  : "flex gap-3 items-center font-medium text-lg p-4 pl-10"
              }
            >
              <i className="fa-solid fa-chart-column text-lg"></i>
              Statistik
            </NavLink>
            <NavLink
              to={"/menu-oversigt"}
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center font-medium text-lg p-4 pl-10 bg-primary text-white"
                  : "flex gap-3 items-center font-medium text-lg p-4 pl-10"
              }
            >
              <i className="fa-solid fa-utensils text-lg"></i>
              Menu
            </NavLink>
            <NavLink
              to={"/admin-indstillinger"}
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center font-medium text-lg p-4 pl-10 bg-primary text-white"
                  : "flex gap-3 items-center font-medium text-lg p-4 pl-10"
              }
            >
              <i className="fa-solid fa-sliders text-lg"></i>
              Indstillinger
            </NavLink>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center font-medium text-lg p-4 pl-10 bg-primary text-white"
                  : "flex gap-3 items-center font-medium text-lg p-4 pl-10"
              }
            >
              <i className="fa-solid fa-users text-lg"></i>
              Kundevisning
            </NavLink>
          </div>
          <div className="justify-self-end">
            <Link onClick={handleUserLogout} className="flex gap-3 items-center font-medium text-lg p-4 pl-10 mb-5">
              <i className="fa-solid fa-arrow-right-from-bracket text-lg"></i>
              Log ud
            </Link>
          </div>
        </nav>
        <div
          onClick={handleOpenCloseMenu}
          className="absolute bg-mainGrey -right-14 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-8 px-4 block rounded-lg cursor-pointer"
        >
          <i className={`fa-solid ${sidebarOpen ? "fa-chevron-left" : "fa-chevron-right"} text-xl`}></i>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
