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
    <div className="flex flex-col bg-mainGrey w-80 min-w-sidebarMinWidth min-w sticky top-0 h-screen drop-shadow-lg">
      <NavLink to={"/ordre-oversigt"} className="m-auto mt-10 mb-20">
        <img src={logo} alt="logo" />
      </NavLink>

      <nav className="flex justify-between flex-col h-full">
        <div className="flex flex-col gap-5">
          <NavLink
            to={"/ordre-oversigt"}
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center font-normal text-xl p-4 pl-10 bg-primary text-white"
                : "flex gap-3 items-center font-normal text-xl p-4 pl-10"
            }
          >
            <i className="fa-solid fa-house text-xl"></i>
            Ordre oversigt
          </NavLink>
          <NavLink
            to={"/ordre-historik"}
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center font-normal text-xl p-4 pl-10 bg-primary text-white"
                : "flex gap-3 items-center font-normal text-xl p-4 pl-10"
            }
          >
            <i className="fa-solid fa-clock-rotate-left text-xl"></i>
            Ordre historik
          </NavLink>
          <NavLink
            to={"/statistik"}
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center font-normal text-xl p-4 pl-10 bg-primary text-white"
                : "flex gap-3 items-center font-normal text-xl p-4 pl-10"
            }
          >
            <i className="fa-solid fa-chart-column text-xl"></i>
            Statistik
          </NavLink>
          <NavLink
            to={"/menu-oversigt"}
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center font-normal text-xl p-4 pl-10 bg-primary text-white"
                : "flex gap-3 items-center font-normal text-xl p-4 pl-10"
            }
          >
            <i className="fa-solid fa-utensils text-xl"></i>
            Menu
          </NavLink>
          <NavLink
            to={"/indstillinger"}
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center font-normal text-xl p-4 pl-10 bg-primary text-white"
                : "flex gap-3 items-center font-normal text-xl p-4 pl-10"
            }
          >
            <i className="fa-solid fa-sliders text-xl"></i>
            Indstillinger
          </NavLink>
        </div>
        <div className="justify-self-end">
          <Link onClick={handleUserLogout} className="flex gap-3 items-center font-normal text-xl p-4 pl-10 mb-5">
            <i className="fa-solid fa-arrow-right-from-bracket text-xl"></i>
            Log ud
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
