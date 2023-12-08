import React, { useEffect, useRef, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import PageH1Title from "../../components/PageH1Title";
import BackButtonWithArrow from "../../components/BackButtonWithArrow";


const OrderHistory = () => {
  
  return (
    <>
      <div className="flex justify-center">
        <AdminSidebar />
        <AdminContentWrapper>
          <BackButtonWithArrow linkText="Tilbage til ordre oversigt" linkTo="/ordre-oversigt" />
          <PageH1Title>Her kan du se alle tidligere ordre</PageH1Title>
          <p>
            Siden er ikke lavet
          </p>
        </AdminContentWrapper>
      </div>
    </>
  );
};

export default OrderHistory;
