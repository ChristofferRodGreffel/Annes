import React, { useEffect, useState } from "react";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import AdminSidebar from "../../components/AdminSidebar";

import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";
import { automaticChangeOfStatus } from "../../helperfunctions/AutomaticChangeOfStatus";
import { listenToNewOrders } from "../../helperfunctions/ListenToNewOrders";
import { receiveFilteredOrders } from "../../helperfunctions/ReceiveFilteredOrders";

const OrderOverview = () => {

  const [recievedOrders, setRecievedOrders] = useState()
  const [userCancelledOrders, setUserCancelledOrders] = useState()
  const [shopCancelledOrders, setShopCancelledOrders] = useState()

  useEffect(() => {
    listenToNewOrders()
  }, [])


  useEffect(() => {
    // Get different orders based on filters and sets them in correct useState
    receiveFilteredOrders(setRecievedOrders, "status", "recieved")
    receiveFilteredOrders(setUserCancelledOrders, "status", "userCancelled")
    receiveFilteredOrders(setShopCancelledOrders, "status", "shopCancelled")
  }, [])

  return (
    <div className="flex justify-center flex-row">
      <AdminSidebar />
      <AdminContentWrapper>

        <h2>Nye bestillinger, som ikke er godkendt</h2>
        {recievedOrders?.map((order, key) => {
          return (
            <p key={key}>Hej, {order.status} order nr. {order.orderNo}</p>
          )
        })}
        <h2>Bestillinger som kunden har annuleret</h2>
        {userCancelledOrders?.map((order, key) => {
          return (
            <p key={key}>Hej, {order.status} order nr. {order.orderNo}</p>
          )
        })}

        <h2>Bestillinger som butikken har annuleret</h2>
        {shopCancelledOrders?.map((order, key) => {
          return (
            <p key={key}>Hej, {order.status} order nr. {order.orderNo}</p>
          )
        })}

      </AdminContentWrapper>
    </div>
  );
};

export default OrderOverview;
