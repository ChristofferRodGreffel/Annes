import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FIREBASE_DB } from "../../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";

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
    const unsub = onSnapshot(doc(FIREBASE_DB, "orders", orderId || currentOrder), (doc) => {
      setCurrentOrder(doc.data().order);
    });
  });

  return (
    <>
      {currentOrder?.status === "pending" && <p>MODTAGET</p>}
      {currentOrder?.status === "accepted" && <p>GODKENDT</p>}
      {currentOrder?.status === "ready" && <p>KLAR I BUTIK</p>}
      {currentOrder?.status === "picked" && <p>AFHENTET</p>}

      <div>
        <h1>Ordre #{currentOrder?.orderNo}</h1>
      </div>
    </>
  );
};

export default OrderStatus;
