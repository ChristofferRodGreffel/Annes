import React from "react";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import CustomerHeader from "../../components/CustomerHeader";

function LandingPage() {
  return (
    <>
      <CustomerHeader nav={true} iconLeft="fa-solid fa-bars" iconRight="fa-solid fa-basket-shopping" />
      <PageWrapperContainer>
        <div className="mt-16">
          <h2 className="text-center mb-3">Vælg mellem 5-6 brødtypper</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between border-b-2 border-grey border-dashed">
              <p>Sandwich</p>
              <p>Fra 59 kr.</p>
            </div>
            <div className="flex justify-between border-b-2 border-grey border-dashed">
              <p>Boller el. bagel</p>
              <p>Fra 48 kr.</p>
            </div>
            <div className="flex justify-between">
              <p>Trekantsandwich</p>
              <p>Fra 23 kr.</p>
            </div>
          </div>
        </div>
      </PageWrapperContainer>
    </>
  );
}

export default LandingPage;
