import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FIREBASE_DB } from "../../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import StatusBar from "../../components/StatusBar";

const OrderStatus = () => {
  const { orderId } = useParams();
  const [currentOrderId, setCurrentOrderId] = useState("");
  const [currentOrder, setCurrentOrder] = useState();

  // Kig først efter ordre id'et i params, ellers i localStorage
  useEffect(() => {
    if (!orderId) {
      setCurrentOrderId(JSON.parse(localStorage.getItem("currentOrder")));
    }

    // Prøver først ID fra params, ellers falder den tilbage på ID fra localStorage
    const unsub = onSnapshot(doc(FIREBASE_DB, "orders", orderId || currentOrderId), (doc) => {
      setCurrentOrder(doc.data().order);
    });
  });

  return (
    <>
      <CustomerHeader
        nav={false}
        iconLeft="fa-solid fa-circle-arrow-left"
        iconRight="fa-solid fa-basket-shopping"
        hideRightIcon={true}
      />
      <PageWrapperContainer>
        {currentOrder?.status === "pending" && <p>IKKE MODTAGET</p>}
        {currentOrder?.status === "recieved" && <p>MODTAGET</p>}
        {currentOrder?.status === "accepted" && <p>GODKENDT</p>}
        {currentOrder?.status === "ready" && <p>KLAR I BUTIK</p>}
        {currentOrder?.status === "picked" && <p>AFHENTET</p>}

        <div className="mt-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl">Ordre #{currentOrder?.orderNo}</h1>
            <div className="flex items-center gap-2 text-lg">
              <p className="font-semibold">Del ordre</p>
              <i className="fa-solid fa-share-from-square text-xl"></i>
            </div>
          </div>
          <div className="mt-10">
            <StatusBar status="recieved" />
          </div>
        </div>
      </PageWrapperContainer>
    </>
  );
};

export default OrderStatus;
