import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase-config";

const setNewOrderStatus = async (orderRef, newStatus) => {
    // To update age and favorite color:
    await updateDoc(orderRef, {
      status: newStatus,
    });
  }

export function getFilteredOrdersFromFirestore(filterByOption, filterByValue, newStatus ) {
    // E.g recive new orders and mark them as "modtaget" 

    const q = query(collection(FIREBASE_DB, "orders"), where(filterByOption, "==", filterByValue));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((orderDoc) => {
            const orderRef = doc(FIREBASE_DB, "orders", orderDoc.id);
            setNewOrderStatus(orderRef, newStatus)
        })
    })
}
