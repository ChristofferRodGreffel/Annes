import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase-config";
import { useEffect } from "react";
import newOrderSound from '../assets/newOrderSound.mp3';


export function listenToNewOrders() {
    // E.g recieve new orders and mark them as "modtaget" 

    const playAudio = () => {
        new Audio(newOrderSound).play();
    }

    const q = query(collection(FIREBASE_DB, "orders"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {

        if (!querySnapshot.empty) {
            playAudio()
        }
    })
}