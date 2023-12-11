import React, { useEffect, useState } from "react";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import AdminSidebar from "../../components/AdminSidebar";

import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";
import { automaticChangeOfStatus } from "../../helperfunctions/AutomaticChangeOfStatus";
import { listenToNewOrders } from "../../helperfunctions/ListenToNewOrders";
import { receiveFilteredOrders } from "../../helperfunctions/ReceiveFilteredOrders";
import OrderCard from "../../components/OrderCard";
import TopRowOrderOverview from "../../components/TopRowOrderOverview";
import { useNavigate } from "react-router-dom";
import CategoryShowHideButton from "../../components/CategoryShowHideButton";
import OrderFiltering from "../../components/OrderFiltering";
import { sortOrderArrays } from "../../helperfunctions/SortOrderArrays";

const OrderOverview = () => {
  const navigate = useNavigate();

  const [recievedOrders, setRecievedOrders] = useState();
  const [acceptedOrders, setAcceptedOrders] = useState();
  const [readyOrders, setReadyOrders] = useState();
  const [pickedOrders, setPickedOrders] = useState();
  const [userCancelledOrders, setUserCancelledOrders] = useState();
  const [shopCancelledOrders, setShopCancelledOrders] = useState();

  const [allOrderNumbersWithName, setAllOrderNumbersWithName] = useState();
  const [filteredOrdersInput, setFilteredOrdersInput] = useState();
  const [filteredOrdersArray, setFilteredOrdersArray] = useState();

  const [newVisibility, setNewVisibility] = useState(true);
  const [readyVisibility, setReadyVisibility] = useState(true);
  const [acceptedVisibility, setAcceptedVisibility] = useState(true);
  const [cancelledVisibility, setCancelledVisiblity] = useState(true);

  useEffect(() => {
    const getAllOrderNumbersWithName = async () => {
      const q = query(collection(FIREBASE_DB, "orders"), where("orderNo", ">", 0));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let resultArray = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()?.orderNo && doc.data()?.customerInfo?.name) {
            let obj = {
              orderNo: doc.data()?.orderNo,
              name: doc.data()?.customerInfo?.name,
              docId: doc.id,
            };
            resultArray.push(obj);
          }
        });
        setAllOrderNumbersWithName(resultArray);
      });
    };
    getAllOrderNumbersWithName();
  }, []);

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

  const handleShowFilteredOrders = async (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (inputValue) {
      const filtered = allOrderNumbersWithName.filter(
        (order) => order.name.toLowerCase().includes(inputValue) || order.orderNo.toString().includes(inputValue)
      );
      setFilteredOrdersArray(filtered);
    } else {
      setFilteredOrdersArray();
    }
  };

  const handleSortOrders = (e) => {
    const allArrays = [
      { state: recievedOrders, setState: setRecievedOrders },
      { state: acceptedOrders, setState: setAcceptedOrders },
      { state: readyOrders, setState: setReadyOrders },
      { state: pickedOrders, setState: setPickedOrders },
      { state: userCancelledOrders, setState: setUserCancelledOrders },
      { state: shopCancelledOrders, setState: setShopCancelledOrders },
    ];

    const sortedArrays = sortOrderArrays(allArrays, e.target.value);

    sortedArrays.forEach(({ state, setState }, index) => {
      setState(state); // Update the state in your component
    });
  };

  return (
    <div className="flex justify-center flex-row">
      <AdminSidebar />
      <AdminContentWrapper>
        <div className="flex flex-col gap-8">
          <div>
            {recievedOrders && (
              <TopRowOrderOverview
                recivedOrders={recievedOrders}
                acceptedOrders={acceptedOrders}
                readyOrders={readyOrders}
                totalOrders={allOrderNumbersWithName}
                handleShowFilteredOrders={handleShowFilteredOrders}
                filteredOrdersInput={filteredOrdersInput}
              />
            )}
            {filteredOrdersArray && (
              <>
                {filteredOrdersArray.length !== 0 ? (
                  <>
                    <p className="font-semibold text-lg mb-2">Resultat:</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-lg">Ingen ordrer matcher denne søgning</p>
                  </>
                )}
                <div className="flex gap-2 flex-wrap mb-10">
                  {filteredOrdersArray?.map((order) => {
                    return (
                      <div
                        key={order.orderNo}
                        className="cursor-pointer border-2 p-2 border-primary rounded-lg transition-all duration-100 ease-in-out hover:bg-primary hover:text-white"
                        onClick={() => navigate(`/ordredetaljer/${order.docId}`)}
                      >
                        <p>
                          <b>Navn:</b> {order.name}
                        </p>
                        <p>
                          <b>Ordre nr.</b> {order.orderNo}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <div className="flex flex-wrap gap-3 mb-5">
              <OrderFiltering onChange={handleSortOrders} />
              <CategoryShowHideButton text="Nye ordre" state={newVisibility} setState={setNewVisibility} />
              <CategoryShowHideButton
                text="Godkendte ordre"
                state={acceptedVisibility}
                setState={setAcceptedVisibility}
              />
              <CategoryShowHideButton
                text="Klar til afhentning"
                state={readyVisibility}
                setState={setReadyVisibility}
              />
              <CategoryShowHideButton
                text="Annullerede ordre"
                state={cancelledVisibility}
                setState={setCancelledVisiblity}
              />
            </div>
          </div>

          {newVisibility && (
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
          )}

          {acceptedVisibility && (
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
          )}

          {readyVisibility && (
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
          )}

          {cancelledVisibility && (
            <div>
              <h2 className="font-bold text-xl mb-1">Annullerede bestillinger</h2>
              <hr className="border-b-2 border-dark mb-5" />
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {userCancelledOrders?.map((order, key) => {
                  return (
                    <div key={key}>
                      <OrderCard order={order} />
                    </div>
                  );
                })}
                {shopCancelledOrders?.map((order, key) => {
                  return (
                    <div key={key}>
                      <OrderCard order={order} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </AdminContentWrapper>
    </div>
  );
};

export default OrderOverview;
