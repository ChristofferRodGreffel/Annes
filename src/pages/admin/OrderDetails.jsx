import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import PageH1Title from "../../components/PageH1Title";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import BackButtonWithArrow from "../../components/BackButtonWithArrow";
import CustomButton from "../../components/CustomButton";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";
import OrderDetailsProduct from "../../components/OrderDetailsProduct";
import OrderButton from "../../components/OrderButton";
import { DefaultToastifySettings } from "../../helperfunctions/DefaultToastSettings";
import { toast } from "react-toastify";
import { timestampConvert } from "../../helperfunctions/TimestampConvert";

const OrderDetails = () => {
  const { orderDocId } = useParams();

  const [orderDetails, setOrderDetails] = useState();
  const [amountOfBreadTypes, setAmountOfBreadTypes] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (orderDocId) {
      const unsub = onSnapshot(doc(FIREBASE_DB, "orders", orderDocId), (doc) => {
        setOrderDetails(doc.data());
        setAmountOfBreadTypes(doc.data().amountOfBreadTypes);
      });
    }
  }, [orderDocId]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    orderDetails.order.forEach((order) => {
      totalPrice += order.price;
    });
    return totalPrice;
  };

  const changeStatus = async (newStatus, message) => {
    const orderRef = doc(FIREBASE_DB, "orders", orderDocId);

    const newUpdate = {
      context: message,
      time: new Date(),
      type: "update",
    };

    await updateDoc(orderRef, {
      status: newStatus,
      updates: arrayUnion(newUpdate),
    }).then(() => {
      toast.success(`Status ændret`, DefaultToastifySettings);
    });

    if (newStatus === "picked") {
      navigate("/ordre-oversigt");
    }
  };

  return (
    <>
      <>
        <div className="flex flex-row">
          <AdminSidebar />
          <AdminContentWrapper>
            {orderDetails ? (
              <>
                <div className="flex justify-between items-center mb-10">
                  <BackButtonWithArrow linkText="Tilbage til ordre oversigt" linkTo="/ordre-oversigt" />
                  <div className="flex gap-6 text-white items-center">
                    <div className="bg-primary py-2 px-6 rounded-lg">
                      <button>
                        Print <i className="fa-solid fa-print"></i>
                      </button>
                    </div>
                    <div className="bg-red py-2 px-6 rounded-lg">
                      <button>
                        Slet ordre <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b-2 border-dark">
                  <h1 className="text-2xl font-bold">Ordre #{orderDetails.orderNo}</h1>
                  <div className="flex gap-6 items-center">
                    <p className="font-bold text-2xl">{orderDetails.amount} stk.</p>
                    <div className="flex gap-2">
                      {amountOfBreadTypes?.map((bread, key) => {
                        if (bread.amount != 0) {
                          return (
                            <p key={key} className="font-light text-2xl">
                              {bread.amount}
                              {bread.shortName}
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <p className="font-semibold">Afhentes:</p>
                  <p>
                    {orderDetails.pickup.time == "Hurtigst muligt"
                      ? "Hurtigst muligt"
                      : timestampConvert(orderDetails.pickup.time.seconds, "stampToPreciseDate")}
                  </p>
                </div>
                <div className="flex gap-5 mt-5 mb-8">
                  <div className="flex flex-col gap-3 text-sm">
                    <div>
                      <h2 className="font-bold text-md mb-1">Kundeinfo</h2>
                      <div className="bg-mainGrey rounded-lg p-4">
                        <div className="flex justify-between">
                          <p className="font-semibold">Navn</p>
                          <p>{orderDetails.customerInfo.name}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-semibold">Tlf.:</p>
                          <p>{orderDetails.customerInfo.tel}</p>
                        </div>
                        <div className="flex justify-between flex-wrap">
                          <p className="font-semibold">Email:</p>
                          <p>{orderDetails.customerInfo.email}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold text-md mb-1">Ordreinfo</h2>
                      <div className="bg-mainGrey rounded-lg p-4">
                        <div className="flex justify-between font-semibold">
                          <p>Forventet pris</p>
                          <p>{calculateTotalPrice()} kr.</p>
                        </div>
                        <div className="flex flex-col justify-between">
                          <p className="font-semibold">Husk:</p>
                          {orderDetails.bagged && <p>Pakkes i pose (+4 kr.)</p>}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold text-md mb-1">Kommentarer</h2>
                      <div className="bg-mainGrey rounded-lg p-4">
                        {orderDetails.comment ? (
                          <p>{orderDetails.comment}</p>
                        ) : (
                          <p>Der er ingen kommentarer fra kunden</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-7">
                    <div className="bg-mainGrey h-full p-4 rounded-lg">
                      {orderDetails.order.map((order, key) => {
                        return (
                          <div key={key}>
                            <OrderDetailsProduct order={order} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-2 w-full text-white mt-3">
                      {orderDetails.status === "recieved" && (
                        <>
                          <OrderButton
                            function={() => changeStatus("accepted", "Bestilling accepteret")}
                            text="Accepter bestilling"
                            green="true"
                          />
                          <OrderButton
                            function={() => changeStatus("shopCancelled", "Butikken har afvist din bestilling")}
                            text="Afvis bestilling"
                          />
                        </>
                      )}
                      {orderDetails.status === "accepted" && (
                        <>
                          <OrderButton
                            function={() => changeStatus("ready", "Din bestilling er klar i butikken")}
                            text="Markér klar til afhentning"
                            green="true"
                          />
                          <OrderButton
                            function={() => changeStatus("recieved", "Din bestilling er modtaget")}
                            text="Fortryd trin"
                          />
                        </>
                      )}
                      {orderDetails.status === "ready" && (
                        <>
                          <OrderButton
                            function={() => changeStatus("picked", "Bestillingen er afhentet af kunden")}
                            text="Markér som afhentet & betalt"
                            green="true"
                          />
                          <OrderButton
                            function={() => changeStatus("accepted", "Bestillingen er ikke klar alligevel")}
                            text="Fortryd trin"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </AdminContentWrapper>
        </div>
      </>
    </>
  );
};

export default OrderDetails;
