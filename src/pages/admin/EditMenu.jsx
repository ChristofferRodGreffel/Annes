import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import BackButtonWithArrow from "../../components/BackButtonWithArrow";
import PageH1Title from "../../components/PageH1Title";

const EditMenu = () => {
  return (
    <>
      <div className="flex justify-center flex-row">
        <AdminSidebar />
        <AdminContentWrapper>
          <BackButtonWithArrow linkText="Tilbage til valgmuligheder" linkTo="/menu-oversigt" />
          <PageH1Title>Rediger Menu</PageH1Title>
        </AdminContentWrapper>
      </div>
    </>
  );
};

export default EditMenu;
