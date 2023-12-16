import React, { useEffect, useRef, useState } from "react";
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
import CustomInputWithLabel from "../../components/CustomInputWithLabel";

// Udviklet fælles i gruppen

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
    if (orderDetails.bagged) {
      totalPrice += 4;
    }
    return totalPrice;
  };

  const changeStatus = async (newStatus, message, messageToCustomer) => {
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
      if (newStatus !== orderDetails.status) {
        toast.success(`Status ændret`, DefaultToastifySettings);
      } else {
        // Status på ordren har ikke ændret sig, hvilket betyder at Admin har sendt en kommentar
        const obj = {
          messageToCustomer: messageToCustomer,
          date: new Date()
        }
        updateDoc(orderRef, {
          commentsFromShop: arrayUnion(obj),
        })
        toast.success(`Besked sendt`, DefaultToastifySettings);
      }
    });

    if (newStatus === "picked") {
      navigate("/ordre-oversigt");
    }
  };


  const commentToCustomerRef = useRef(null)
  const handleSendCommentToCustomer = (e) => {
    e.preventDefault()
    if (commentToCustomerRef) {
      const value = commentToCustomerRef.current.commentFieldToCustomer.value

      if (!value) {
        toast.error("Beskeden kan ikke være tom...", DefaultToastifySettings);
      } else {
        // Opdaterer status hos kunden
        changeStatus(orderDetails.status, "Butikken har sendt en besked", value)
        commentToCustomerRef.current.commentFieldToCustomer.value = ""
      }
    }
  }

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
                            <p key={key} className={`font-light text-2xl ${bread.shortName === "GF" ? "text-red font-semibold" : undefined}`}>
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
                <div className="flex flex-col lg:flex-row gap-5 mt-5 mb-8 ">
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
                    <div className="bg-mainGrey min-h-[20rem] p-4 rounded-lg">
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
                    <div className="my-10 pb-20" >
                      <form ref={commentToCustomerRef}>
                        <CustomInputWithLabel
                          type="textarea"
                          label="Kommentar til kunden"
                          name="commentFieldToCustomer"
                          placeholder="Skriv kommentar her..."
                          button={true}
                          buttonText="Send kommentar"
                          customOnClick={handleSendCommentToCustomer}
                        />
                      </form>
                      <div className="mt-10">
                        {orderDetails?.commentsFromShop && (
                          <>
                            {orderDetails?.commentsFromShop
                              ?.slice(0)
                              .reverse()
                              .map((comment, key) => {
                                return (
                                  <div key={key} className="flex flex-col gap-2 mb-4">
                                    <div className="flex flex-col">
                                      <p className="text-xl text-primary font-semibold">Besked fra butikken:</p>
                                      <div className="p-4 border-dark border-2 rounded-xl w-full md:min-w-[300px] md:max-w-max">
                                        <p className="text-md font-medium italic max-w-readable">"{comment.messageToCustomer}"</p>
                                      </div>
                                    </div>
                                    <p>{timestampConvert(comment.date.seconds, "stampToPreciseDate")}</p>
                                  </div>
                                );
                              })}
                          </>
                        )}
                      </div>
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
