import React, { useEffect, useState } from "react";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import PageH1Title from "../../components/PageH1Title";
import CheckoutProduct from "../../components/CheckoutProduct";
import OpeningHoursSelect from "../../components/OpeningHoursSelect";

function CheckoutOverview() {
  const [amountFromBasket, setAmountFromBasket] = useState(0);
  const [priceFromBasket, setPriceFromBasket] = useState(0);
  const [allBasketProducts, setAllBasketProducts] = useState();

  useEffect(() => {
    const basketFromStorage = JSON.parse(localStorage.getItem("customerCheckout"));

    if (basketFromStorage) {
      var totalPriceFromBasket = 0;
      var totalAmountFromBasket = 0;

      basketFromStorage.forEach((subData) => (totalPriceFromBasket += subData.price));
      basketFromStorage.forEach((subData) => (totalAmountFromBasket += subData.amount));

      setAllBasketProducts(basketFromStorage);
      setPriceFromBasket(totalPriceFromBasket);
      setAmountFromBasket(totalAmountFromBasket);
    }
  }, []);

  return (
    <>
      <CustomerHeader
        nav={false}
        iconLeft="fa-solid fa-circle-arrow-left"
        iconRight="fa-solid fa-basket-shopping"
        hideRightIcon={true}
      />
      <PageWrapperContainer>
        <div className="breakout mt-10">
          <h1 className="text-3xl font-bold">Din bestilling </h1>
        </div>
        <div className="breakout mt-5 mb-5">
          {allBasketProducts?.map((product, key) => {
            return (
              <div key={key}>
                <CheckoutProduct product={product} index={key} length={allBasketProducts?.length} />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3" >
          <div className="text-2xl font-bold flex justify-between items-center">
            <h2>Antal:</h2>
            <p>{amountFromBasket} stk.</p>
          </div>
          <div className="text-2xl font-bold flex justify-between items-center">
            <h2>I alt:</h2>
            <p>{priceFromBasket} stk.</p>
          </div>
        </div>

        <div className="my-5">
          <OpeningHoursSelect />
        </div>

      </PageWrapperContainer>
    </>
  );
}

export default CheckoutOverview;
