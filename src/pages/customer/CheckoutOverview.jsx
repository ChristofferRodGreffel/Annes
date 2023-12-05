import React, { useEffect, useRef, useState } from "react";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import CheckoutProduct from "../../components/CheckoutProduct";
import OpeningHoursSelect from "../../components/OpeningHoursSelect";
import CollectionDatePicker from "../../components/CollectionDatePicker";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import CustomButton from "../../components/CustomButton";

function CheckoutOverview() {
  const [amountFromBasket, setAmountFromBasket] = useState(0);
  const [priceFromBasket, setPriceFromBasket] = useState(0);
  const [allBasketProducts, setAllBasketProducts] = useState();

  useEffect(() => {
    updateFromLocalStorage();
  }, []);

  const updateFromLocalStorage = () => {
    const basketFromStorage = JSON.parse(localStorage.getItem("customerCheckout"));

    if (basketFromStorage) {
      let totalPriceFromBasket = 0;
      let totalAmountFromBasket = 0;

      basketFromStorage.forEach((subData) => (totalPriceFromBasket += subData.price));
      basketFromStorage.forEach((subData) => (totalAmountFromBasket += subData.amount));

      console.log("kører!");
      setAllBasketProducts(basketFromStorage);
      setPriceFromBasket(totalPriceFromBasket);
      setAmountFromBasket(totalAmountFromBasket);
    }
  };

  const formRef = useRef(null);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
  };

  const handleDeleteProduct = (index) => {
    const newBasket = [...allBasketProducts];
    newBasket.splice(index, 1);
    localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
    setAllBasketProducts(newBasket);
    updateFromLocalStorage();
  };

  return (
    <>
      <CustomerHeader
        nav={false}
        iconLeft="fa-solid fa-circle-arrow-left"
        iconRight="fa-solid fa-basket-shopping"
        hideRightIcon={true}
      />
      <PageWrapperContainer>
        <div className="breakout">
          <div className=" mt-10">
            <h1 className="text-3xl font-bold flex items-center justify-between">
              Din kurv
              <i className="fa-solid fa-basket-shopping"></i>
            </h1>
          </div>
          <div className=" mt-5 mb-5">
            {allBasketProducts && allBasketProducts != 0 ? (
              allBasketProducts?.map((product, key) => {
                return (
                  <div key={key}>
                    <CheckoutProduct
                      product={product}
                      index={key}
                      length={allBasketProducts?.length}
                      handleDeleteProduct={handleDeleteProduct}
                    />
                  </div>
                );
              })
            ) : (
              <p>Din kurv er tom...</p>
            )}
          </div>

          {allBasketProducts && (
            <div>
              <div className="flex flex-col gap-3">
                <div className="text-2xl font-bold flex justify-between items-center">
                  <h2>Antal:</h2>
                  <p>{amountFromBasket} stk.</p>
                </div>
                <div className="text-2xl font-bold flex justify-between items-center">
                  <h2>I alt:</h2>
                  <p>{priceFromBasket} kr.</p>
                </div>
              </div>

              <div className="my-5">
                <OpeningHoursSelect />

                <CollectionDatePicker />

                <div className="flex gap-1 items-center my-5">
                  <input type="checkbox" name="bagName" id="bagId" />
                  <label htmlFor="bagId">Pakkes i pose (+4 kr.)</label>
                </div>

                <CustomInputWithLabel
                  type="textarea"
                  label="Evt. kommentar**"
                  name="commentField"
                  placeholder="Skriv kommentar her..."
                />

                <p className="italic mt-2 mb-5">
                  * Der tages forbehold for forsinkelser
                  <br />
                  ** Vi kan ikke garentere at kunne opfylde dine ønsker
                </p>

                <form ref={formRef} onSubmit={handlePlaceOrder}>
                  <div className="flex flex-col gap-4">
                    <CustomInputWithLabel
                      type="text"
                      label="Dit navn"
                      name="customerInputName"
                      placeholder="Skriv navn her..."
                    />
                    <CustomInputWithLabel
                      type="tel"
                      label="Dit telefonnummer"
                      name="customerInputPhone"
                      placeholder="Skriv telefonnr. her..."
                    />
                    <CustomInputWithLabel
                      type="email"
                      label="Din email"
                      name="customerInputEmail"
                      placeholder="Skriv email her..."
                    />
                  </div>

                  <div className="flex gap-1 items-center my-5">
                    <input type="checkbox" name="customerNotification" id="customerNotification" />
                    <label htmlFor="customerNotification">Modtag SMS med statusopdateringer</label>
                  </div>

                  <CustomButton
                    customWidth="w-full"
                    title="Send bestilling til butik"
                    icon={"fa-solid fa-paper-plane"}
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </PageWrapperContainer>
    </>
  );
}

export default CheckoutOverview;
