import React from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FIREBASE_AUTH } from "../../firebase-config";
import { signOut } from "firebase/auth";

const AdminSidebar = () => {
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col bg-mainGrey min-w-sidebarMinWidth sticky top-0 h-screen drop-shadow-lg">
      <NavLink to={"/ordre-oversigt"} className="m-auto mt-10 mb-16">
        <img className="w-48" src={logo} alt="logo" />
      </NavLink>

      <nav className="flex justify-between flex-col h-full">
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
    </div>
  );
};

export default AdminSidebar;
