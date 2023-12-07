import React, { useEffect, useState } from "react";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import AdminSidebar from "../../components/AdminSidebar";

import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";
import { getFilteredOrdersFromFirestore } from "../../helperfunctions/GetFilteredOrdersFromFirestore";


const OrderOverview = () => {

  useEffect(() => {
    
    // Getting new orders and marks them as recived when the shop-workers have the page open 
    // getFilteredOrdersFromFirestore is in helperfunctions
    getFilteredOrdersFromFirestore("status", "pending", "recieved")


  }, [])

  return (
    <div className="flex justify-center flex-row">
      <AdminSidebar />
      <AdminContentWrapper>

      </AdminContentWrapper>
    </div>
  );
};

export default OrderOverview;
