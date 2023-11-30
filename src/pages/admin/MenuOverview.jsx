import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import PageH1Title from "../../components/PageH1Title";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import MenuCategoryLink from "../../components/MenuCategoryLink";

const MenuOverview = () => {
  return (
    <>
      <div className="flex flex-row">
        <AdminSidebar />
        <AdminContentWrapper>
          <PageH1Title>Menu</PageH1Title>
          <div className="flex flex-col gap-5 mt-10">
            <MenuCategoryLink
              title="Tilføj nyt produkt til menu"
              icon="fa-solid fa-plus"
              link="/menu-oversigt/opret-produkt"
            />
            <MenuCategoryLink title="Rediger eksisterende menu" icon="fa-solid fa-pen-to-square" link="#" />
            <MenuCategoryLink title="Medarbejder guides" icon="fa-solid fa-book-open" link="#" />
          </div>
        </AdminContentWrapper>
      </div>
    </>
  );
};

export default MenuOverview;
