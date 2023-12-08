import React, { useEffect, useState } from "react";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import AdminSidebar from "../../components/AdminSidebar";

import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";
import { automaticChangeOfStatus } from "../../helperfunctions/AutomaticChangeOfStatus";
import { listenToNewOrders } from "../../helperfunctions/ListenToNewOrders";
import { receiveFilteredOrders } from "../../helperfunctions/ReceiveFilteredOrders";
import OrderCard from "../../components/OrderCard";

const OrderOverview = () => {
  const [recievedOrders, setRecievedOrders] = useState();
  const [acceptedOrders, setAcceptedOrders] = useState();
  const [readyOrders, setReadyOrders] = useState();
  const [pickedOrders, setPickedOrders] = useState();
  const [userCancelledOrders, setUserCancelledOrders] = useState();
  const [shopCancelledOrders, setShopCancelledOrders] = useState();

  useEffect(() => {
    listenToNewOrders();
  }, []);

  useEffect(() => {
    // Get different orders based on filters and sets them in correct useState
    receiveFilteredOrders(setRecievedOrders, "status", "recieved");
    receiveFilteredOrders(setAcceptedOrders, "status", "accepted");
    receiveFilteredOrders(setReadyOrders, "status", "ready");
    receiveFilteredOrders(setPickedOrders, "status", "picked");
    receiveFilteredOrders(setUserCancelledOrders, "status", "userCancelled");
    receiveFilteredOrders(setShopCancelledOrders, "status", "shopCancelled");
  }, []);

  return (
    <div className="flex justify-center flex-row">
      <AdminSidebar />
      <AdminContentWrapper>
        <h2>Nye bestillinger, som ikke er godkendt</h2>
        <div className="flex gap-5">
          {recievedOrders?.map((order, key) => {
            return (
              <div key={key}>
                <OrderCard order={order} />
              </div>
            );
          })}
        </div>
        <h2>Bestillinger, som er godkendt</h2>
        {acceptedOrders?.map((order, key) => {
          return (
            <p key={key}>
              Hej, {order.status} order nr. {order.orderNo}
            </p>
          );
        })}
        <h2>Bestillinger, som er klar til afhentning</h2>
        {readyOrders?.map((order, key) => {
          return (
            <p key={key}>
              Hej, {order.status} order nr. {order.orderNo}
            </p>
          );
        })}
        <h2>Bestillinger, som er afhentet</h2>
        {pickedOrders?.map((order, key) => {
          return (
            <p key={key}>
              Hej, {order.status} order nr. {order.orderNo}
            </p>
          );
        })}

        <h2>Bestillinger som kunden har annulleret</h2>
        {userCancelledOrders?.map((order, key) => {
          return (
            <p key={key}>
              Hej, {order.status} order nr. {order.orderNo}
            </p>
          );
        })}

        <h2>Bestillinger som butikken har annulleret</h2>
        {shopCancelledOrders?.map((order, key) => {
          return (
            <p key={key}>
              Hej, {order.status} order nr. {order.orderNo}
            </p>
          );
        })}
      </AdminContentWrapper>
    </div>
  );
};

export default OrderOverview;
