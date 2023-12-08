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
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-bold text-xl mb-1">Nye bestillinger</h2>
            <hr className="border-b-2 border-dark mb-5" />
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {recievedOrders?.map((order, key) => {
                return (
                  <div key={key}>
                    <OrderCard order={order} />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-1">Godkendte bestillinger</h2>
            <hr className="border-b-2 border-dark mb-5" />
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {acceptedOrders?.map((order, key) => {
                return (
                  <div key={key}>
                    <OrderCard order={order} />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-1">Klar til afhentning</h2>
            <hr className="border-b-2 border-dark mb-5" />
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {readyOrders?.map((order, key) => {
                return (
                  <div key={key}>
                    <OrderCard order={order} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AdminContentWrapper>
    </div>
  );
};

export default OrderOverview;
