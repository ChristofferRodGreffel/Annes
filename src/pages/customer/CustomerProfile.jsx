import React, { useEffect, useState } from "react";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import CustomerHeader from "../../components/CustomerHeader";
import CustomButton from "../../components/CustomButton";
import { FIREBASE_AUTH } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

const CustomerProfile = () => {
  const navigate = useNavigate();

  const handleUserLogOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        // Sign-out successful.
        navigate("/bestil-online");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <CustomerHeader nav={true} iconLeft="fa-solid fa-bars" iconRight="fa-solid fa-basket-shopping" />
      <PageWrapperContainer>
        <CustomButton title="Log ud" function={handleUserLogOut} />
      </PageWrapperContainer>
    </>
  );
};

export default CustomerProfile;
