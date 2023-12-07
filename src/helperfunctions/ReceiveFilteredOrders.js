import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase-config";
import { useEffect } from "react";


export function receiveFilteredOrders(setRecievedOrders, filterByOption, filterByValue) {
    //  recieve all orders with provided option and value 

    const q = query(collection(FIREBASE_DB, "orders"), where(filterByOption, "==", filterByValue));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
        } else {
            let resultArray = []
            querySnapshot.forEach((doc) => {
                resultArray.push(doc.data());
            })
            setRecievedOrders(resultArray)
        }
    })
}