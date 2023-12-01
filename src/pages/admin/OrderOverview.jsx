import React from "react";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import AdminSidebar from "../../components/AdminSidebar";

const OrderOverview = () => {
  return (
    <div className="flex justify-center flex-row">
      <AdminSidebar />
      <AdminContentWrapper></AdminContentWrapper>
    </div>
  );
};

export default OrderOverview;
