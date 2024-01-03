import React, { useEffect, useRef, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import PageH1Title from "../../components/PageH1Title";
import BackButtonWithArrow from "../../components/BackButtonWithArrow";

// Udviklet fælles i gruppen

function Statistics() {
  return (
    <>
      <div className="flex justify-center">
        <AdminSidebar />
        <AdminContentWrapper>
          <BackButtonWithArrow linkText="Tilbage til ordre oversigt" linkTo="/ordre-oversigt" />
          <PageH1Title>
            Her kan du se statistik om kundernes brug af hjemmesiden, hvilke produkter der klarer sig bedst mm.{" "}
          </PageH1Title>
          <p>Siden er ikke lavet</p>
        </AdminContentWrapper>
      </div>
    </>
  );
}

export default Statistics;
