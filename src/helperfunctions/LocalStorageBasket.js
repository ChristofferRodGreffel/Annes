export default function localStorageBasket(newProduct, productIndex) {
  const basketFromStorage = localStorage.getItem("customerCheckout");

  if (basketFromStorage) {
    let newBasket = JSON.parse(basketFromStorage)

    if(productIndex >= 0) {
      newBasket = newBasket.slice(0, productIndex).concat(newBasket.slice(productIndex+1))
    }
    newBasket.push(newProduct)
    localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
  } else {
    localStorage.setItem("customerCheckout", JSON.stringify([newProduct]));
  }
}
