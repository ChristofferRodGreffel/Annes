import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div>
      <img src={logo} alt="logo" />
      <nav>
        <Link to={"#"}>
          <i className="fa-solid fa-house"></i>
          Ordre oversigt
        </Link>
        <Link to={"#"}>
          <i class="fa-solid fa-clock-rotate-left"></i>
          Ordre historik
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
