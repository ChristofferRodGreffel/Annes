import React from "react";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import CustomerHeader from "../../components/CustomerHeader";

const CustomerProfile = () => {
  return (
    <>
      <CustomerHeader nav={true} iconLeft="fa-solid fa-bars" iconRight="fa-solid fa-basket-shopping" />
      <PageWrapperContainer></PageWrapperContainer>
    </>
  );
};

export default CustomerProfile;
