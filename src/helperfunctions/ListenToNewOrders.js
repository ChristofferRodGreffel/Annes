import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase-config";
import newOrderSound from "../assets/newOrderSound.mp3";

export function listenToNewOrders() {
  // E.g recieve new orders and mark them as "modtaget"

  const audio = new Audio(newOrderSound);
  audio.preload = "auto";

  const playAudio = () => {
    audio.play();
  };

  const q = query(collection(FIREBASE_DB, "orders"), where("status", "==", "pending"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      playAudio();
    }
  });
}
