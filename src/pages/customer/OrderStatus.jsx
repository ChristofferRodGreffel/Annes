import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FIREBASE_DB } from "../../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import StatusBar from "../../components/StatusBar";
import CancelOrder from "../../components/CancelOrder";

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
    const unsub = onSnapshot(doc(FIREBASE_DB, "orders", orderId), (doc) => {
      setCurrentOrder(doc.data().order);
    });
  }, []);

  console.log(currentOrder);

  return (
    <>
      <CustomerHeader
        nav={false}
        iconLeft="fa-solid fa-circle-arrow-left"
        iconRight="fa-solid fa-basket-shopping"
        hideRightIcon={true}
      />
      <PageWrapperContainer>
        {currentOrder && (
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl">Ordre #{currentOrder?.orderNo}</h1>
              <div className="flex items-center gap-2 text-lg">
                <p className="font-semibold">Del ordre</p>
                <i className="fa-solid fa-share-from-square text-xl"></i>
              </div>
            </div>
            <div className="mt-12">
              <StatusBar status={currentOrder?.status} />
            </div>
            <div className="mt-16 mb-16 flex text-center w-full max-w-max m-auto text-xl relative">
              {currentOrder?.status === "pending" && <p>"Din bestiling er sendt til butikken"</p>}
              {currentOrder?.status === "recieved" && <p>"Din bestiling er modtaget"</p>}
              {currentOrder?.status === "accepted" && <p>"Vi har accepteret din bestilling"</p>}
              {currentOrder?.status === "ready" && <p>"Din bestiling er klar i butikken"</p>}
              {currentOrder?.status === "picked" && <p>"Du har afhentet din mad, velbekomme"</p>}
              <i className="fa-solid fa-comment absolute -right-2 -top-5 text-8xl opacity-10 text-grey"></i>
            </div>
            <div className="mt-10 full-width">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Afhentningstid</h3>
                <p>{currentOrder?.pickup.time}</p>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Afhentningsdato</h3>
                <p>{currentOrder?.pickup.date}</p>
              </div>
            </div>
            <div className="mt-8">
              <CancelOrder placedAt={currentOrder.orderPlacedAt} orderId={orderId || currentOrderId} />
            </div>
          </div>
        )}
      </PageWrapperContainer>
    </>
  );
};

export default OrderStatus;
