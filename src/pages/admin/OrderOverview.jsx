import React, { useEffect, useState } from "react";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import AdminSidebar from "../../components/AdminSidebar";

import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";
import { automaticChangeOfStatus } from "../../helperfunctions/AutomaticChangeOfStatus";
import { listenToNewOrders } from "../../helperfunctions/ListenToNewOrders";

const OrderOverview = () => {
  
  useEffect(() => {
    listenToNewOrders()
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
