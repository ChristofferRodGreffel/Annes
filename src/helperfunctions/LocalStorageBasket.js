export default function localStorageBasket(newProduct) {
  const basketFromStorage = localStorage.getItem("customerCheckout");

  if (basketFromStorage) {
    let newBasket = JSON.parse(basketFromStorage);
    newBasket.push(newProduct);
    localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
  } else {
    localStorage.setItem("customerCheckout", JSON.stringify([newProduct]));
  }
}
