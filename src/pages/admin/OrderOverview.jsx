import React, { useEffect, useState } from "react";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import AdminSidebar from "../../components/AdminSidebar";

import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";


const OrderOverview = () => {

  useEffect(() => {

    const MarkAsRecived = async (orderRef) => {
      // To update age and favorite color:
      await updateDoc(orderRef, {
        status: "recieved",
      });
    }
    const reciveAndMarkNewOrders = () => {
      // Recive new orders and mark them as "modtaget" 
      const q = query(collection(FIREBASE_DB, "orders"), where("status", "==", "pending"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((orderDoc) => {
          const orderRef = doc(FIREBASE_DB, "orders", orderDoc.id);
          MarkAsRecived(orderRef)
        })
      })
    }
    reciveAndMarkNewOrders()
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
