import { useNavigate } from "react-router-dom";

export default function localStorageBasket(newProduct) {
  const basketFromStorage = JSON.parse(localStorage.getItem("customerCheckout"));

  if (basketFromStorage) {
    let newBasket = basketFromStorage;
    newBasket.push(newProduct);
    localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
  } else {
    localStorage.setItem("customerCheckout", JSON.stringify([newProduct]));
  }
}
