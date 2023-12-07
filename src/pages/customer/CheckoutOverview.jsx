import React, { useEffect, useState } from "react";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import CheckoutProduct from "../../components/CheckoutProduct";
import OpeningHoursSelect from "../../components/OpeningHoursSelect";
import CollectionDatePicker from "../../components/CollectionDatePicker";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import CustomButton from "../../components/CustomButton";
import { DefaultToastifySettings } from "../../helperfunctions/DefaultToastSettings";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";
import { PulseLoader } from "react-spinners";

function CheckoutOverview() {
  const [amountFromBasket, setAmountFromBasket] = useState(0);
  const [priceFromBasket, setPriceFromBasket] = useState(0);
  const [allBasketProducts, setAllBasketProducts] = useState();
  const [loading, setLoading] = useState(false);

  const [chosenCollectionDate, setChosenCollectionDate] = useState(new Date());
  const [chosenCollectionTime, setChosenCollectionTime] = useState();
  const [comment, setComment] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const navigate = useNavigate();

  const currentDate = new Date();
  const [shopIsClosed, setShopIsClosed] = useState(false);

  useEffect(() => {
    const shopClosingTime = 1830;

    if (
      currentDate.toLocaleDateString() === chosenCollectionDate.toLocaleDateString() &&
      `${Number(currentDate.getHours())}${Number(currentDate.getMinutes())}` >= shopClosingTime
    ) {
      setShopIsClosed(true);
    } else {
      setShopIsClosed(false);
    }
  }, [chosenCollectionDate, currentDate]);

  useEffect(() => {
    if (currentDate.toLocaleDateString() === chosenCollectionDate.toLocaleDateString()) {
      setChosenCollectionTime("Hurtigst muligt");
    } else {
      let isWeekend = chosenCollectionDate.getDay() === 0 || chosenCollectionDate.getDay() === 6; // Sunday or Saturday

      let formattedHour;
      if (isWeekend) {
        formattedHour = `${"10".padStart(2, "0")}:${"0".padStart(2, "0")}`;
      } else {
        formattedHour = `${"7".padStart(2, "0")}:${"0".padStart(2, "0")}`;
      }
      setChosenCollectionTime(formattedHour);
    }
  }, [chosenCollectionDate]);

  useEffect(() => {
    updateFromLocalStorage();
  }, []);

  // Funktionen kigger efter "customerCheckout" i localStorage of henter den.
  // Vores states sættes ud fra indholdet af kurven i localStorage.
  const updateFromLocalStorage = () => {
    const basketFromStorage = JSON.parse(localStorage.getItem("customerCheckout"));

    if (basketFromStorage) {
      let totalPriceFromBasket = 0;
      let totalAmountFromBasket = 0;

      basketFromStorage.forEach((subData) => (totalPriceFromBasket += subData.singlePrice * subData.amount));
      basketFromStorage.forEach((subData) => (totalAmountFromBasket += subData.amount));

      setAllBasketProducts(basketFromStorage);
      setPriceFromBasket(totalPriceFromBasket);
      setAmountFromBasket(totalAmountFromBasket);
    }
  };

  // Bruges til at slette et produkt fra kurven. Den laver en kopi af "kurven" og finder det produkt
  // Som matcher index nummeret (gives videre fra CheckoutProduct.jsx). Derefter bruges splice til at
  // trække produktet ud af arrayet og derefter indsættes arrayet igen i localStorage så kurven er opdateret.
  const handleDeleteProduct = (index) => {
    const newBasket = [...allBasketProducts];
    newBasket.splice(index, 1);
    localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
    setAllBasketProducts(newBasket);
    updateFromLocalStorage();
    toast.success("Produkt slettet", DefaultToastifySettings);
  };

  // Bruges til at øge antallet af X produkt i kurven. Giver hele product objektet med videre
  // fra CheckoutProduct.jsx og øger værdien med 1. Derefter opdateres localStorage.
  const handleIncrease = (product) => {
    product.amount += 1;
    const newBasket = [...allBasketProducts];
    localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
    setAllBasketProducts(newBasket);
    updateFromLocalStorage();
  };

  // Bruges til at mindske antallet af X produkt i kurven. Giver hele product objektet med videre
  // fra CheckoutProduct.jsx og øger værdien med 1. Derefter opdateres localStorage.
  const handleDecrease = (product) => {
    let current = product.amount;
    if (current > 1) {
      product.amount -= 1;
      const newBasket = [...allBasketProducts];
      localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
      setAllBasketProducts(newBasket);
      updateFromLocalStorage();
    } else {
      toast.error("Brug 'slet' knappen til at fjerne et produkt", DefaultToastifySettings);
    }
  };

  // Kører når kunden vil sende ordren afsted.
  // Vi bygger et samlet objekt som indeholder alt information omkring ordren.
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    const bagCheckbox = document.querySelector("#bagId").checked;
    const smsCheckbox = document.querySelector("#customerNotification").checked;

    const time = new Date().getTime();

    const completeOrder = {
      orderPlacedAt: time,
      pickup: {
        date: chosenCollectionDate.toLocaleDateString("en-GB"),
        time: chosenCollectionTime,
      },
      order: allBasketProducts,
      customerInfo: {
        name: customerName,
        tel: customerPhone,
        email: customerEmail,
      },
      comment: comment,
      bagged: bagCheckbox,
      notifications: smsCheckbox,
      status: "pending",
      orderNo: await generateOrderNumber(),
      canCancel: true,
    };

    pushOrderToFirestore(completeOrder);
  };

  const pushOrderToFirestore = async (order) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(FIREBASE_DB, "orders"), order);
    if (docRef.id) {
      const orderRef = doc(FIREBASE_DB, "orders", docRef.id);

      await updateDoc(orderRef, {
        status: "recieved",
      }).then(() => {
        localStorage.setItem("currentOrder", JSON.stringify(docRef.id));
        navigate(`/følg-bestilling/${docRef.id}`);
        localStorage.removeItem("customerCheckout");
        toast.success("Ordre placeret", DefaultToastifySettings);
        setLoading(false);
      });
    }
  };

  // Genereate a order number which is the next in the sequence starting from 1
  const generateOrderNumber = async () => {
    let currentOrderNumber = 0;

    // Get 'counter' document
    const docRef = doc(FIREBASE_DB, "orders", "counter");
    const docSnap = await getDoc(docRef);

    // If 'counter' exists, set currentOrderNumber to that value + 1
    // If not, then set the currentOrderNumber to 1 (the first order)
    if (docSnap.exists()) {
      currentOrderNumber = docSnap.data().count += 1;
    } else {
      currentOrderNumber = 1;
      await setDoc(doc(FIREBASE_DB, "orders", "counter"), {
        count: currentOrderNumber,
      });
    }

    // Update the counter document to be up to date
    const orderCounterRef = doc(FIREBASE_DB, "orders", "counter");

    await updateDoc(orderCounterRef, {
      count: currentOrderNumber,
    });

    // Then return the order number for the order object to use
    return currentOrderNumber;
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
                      increase={handleIncrease}
                      decrease={handleDecrease}
                    />
                  </div>
                );
              })
            ) : (
              <p>Din kurv er tom...</p>
            )}
          </div>

          {allBasketProducts && allBasketProducts != 0 && (
            <div>
              <div className="flex flex-col gap-3">
                <div className="text-2xl font-bold flex justify-between items-center">
                  <h2>Antal:</h2>
                  <p>{amountFromBasket} stk.</p>
                </div>
                <div className="text-2xl font-bold flex justify-between items-center">
                  <h2>I alt:</h2>
                  <p>{priceFromBasket.toLocaleString("da-DK")} kr.</p>
                </div>
              </div>

              <div className="my-5">
                <CollectionDatePicker
                  chosenCollectionDate={chosenCollectionDate}
                  setChosenCollectionDate={setChosenCollectionDate}
                />

                <OpeningHoursSelect
                  chosenCollectionDate={chosenCollectionDate}
                  setChosenCollectionTime={setChosenCollectionTime}
                  chosenCollectionTime={chosenCollectionTime}
                />

                <div className="flex gap-1 items-center my-5">
                  <input type="checkbox" name="bagName" id="bagId" />
                  <label htmlFor="bagId">Pakkes i pose (+4 kr.)</label>
                </div>

                <CustomInputWithLabel
                  type="textarea"
                  label="Evt. kommentar**"
                  name="commentField"
                  placeholder="Skriv kommentar her..."
                  customSetvalue={setComment}
                />

                <p className="italic mt-2 mb-5">
                  * Der tages forbehold for forsinkelser
                  <br />
                  ** Vi kan ikke garentere at kunne opfylde dine ønsker
                </p>

                <form onSubmit={handlePlaceOrder}>
                  <div className="flex flex-col gap-4">
                    <CustomInputWithLabel
                      type="text"
                      label="Dit navn"
                      name="customerInputName"
                      placeholder="Skriv navn her..."
                      customSetvalue={setCustomerName}
                    />
                    <CustomInputWithLabel
                      type="tel"
                      label="Dit telefonnummer"
                      name="customerInputPhone"
                      placeholder="Skriv telefonnr. her..."
                      customSetvalue={setCustomerPhone}
                    />
                    <CustomInputWithLabel
                      type="email"
                      label="Din email"
                      name="customerInputEmail"
                      placeholder="Skriv email her..."
                      customSetvalue={setCustomerEmail}
                    />
                  </div>

                  <div className="flex gap-1 items-center my-5">
                    <input type="checkbox" name="customerNotification" id="customerNotification" />
                    <label htmlFor="customerNotification">Modtag SMS med statusopdateringer</label>
                  </div>

                  {shopIsClosed && (
                    <p className="text-md font-semibold text-center italic text-red">
                      Det er desværre for sent at bestille til i dag.
                    </p>
                  )}
                  {loading ? (
                    <>
                      <CustomButton
                        title={<PulseLoader color="#FFFFFF" size={11} className="p-1" />}
                        disabled={true}
                        customWidth="w-full"
                      />
                    </>
                  ) : (
                    <>
                      <CustomButton
                        iconRight={true}
                        customWidth="w-full"
                        title="Send bestilling til butik"
                        icon={"fa-solid fa-paper-plane"}
                        disabled={shopIsClosed}
                      />
                    </>
                  )}
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
