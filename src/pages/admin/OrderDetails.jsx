import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import PageH1Title from "../../components/PageH1Title";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import BackButtonWithArrow from "../../components/BackButtonWithArrow";
import CustomButton from "../../components/CustomButton";
import { doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";

const OrderDetails = () => {
  const { orderDocId } = useParams();

  const [orderDetails, setOrderDetails] = useState()
  const [amountOfBreadTypes, setAmountOfBreadTypes] = useState()

  useEffect(() => {
    if (orderDocId) {
      const unsub = onSnapshot(doc(FIREBASE_DB, "orders", orderDocId), (doc) => {
        setOrderDetails(doc.data())
        setAmountOfBreadTypes(doc.data().amountOfBreadTypes)
      });
    }
  }, [orderDocId]);

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
                  <h1 className="text-4xl font-bold">Ordre #{orderDetails.orderNo}</h1>
                  <div className="flex gap-6 items-center">
                    <p className="font-bold text-2xl">{orderDetails.amount} stk.</p>
                    <div className="flex gap-2">
                      {amountOfBreadTypes?.map((bread, key) => {
                        if (bread.amount != 0) {
                          return (
                            <p key={key} className="font-light text-2xl">{bread.amount}{bread.shortName}</p>
                          )
                        }
                      })}
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
