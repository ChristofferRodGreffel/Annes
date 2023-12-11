import { collection, query, where, onSnapshot, updateDoc, doc, orderBy } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase-config";
import { useEffect } from "react";
import { sortOrderArrays } from "./SortOrderArrays";

export function receiveFilteredOrders(setRecievedOrders, filterByOption, filterByValue) {
  //  recieve all orders with provided option and value

  const q = query(
    collection(FIREBASE_DB, "orders"),
    where(filterByOption, "==", filterByValue),
    orderBy("orderPlacedAt")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.empty) {
    } else {
      let resultArray = [];
      querySnapshot.forEach((doc) => {
        resultArray.push(doc.data());
      });
      setRecievedOrders(resultArray);
    }
  });
}
