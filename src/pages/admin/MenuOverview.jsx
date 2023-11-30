import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import CreateMenuProduct from "./CreateMenuProduct";
import PageWrapperContainer from "../../components/PageWrapperContainer";

const MenuOverview = () => {
  return (
    <>
      <div className="flex flex-row">
        <AdminSidebar />
        <CreateMenuProduct />
      </div>
    </>
  );
};

export default MenuOverview;
