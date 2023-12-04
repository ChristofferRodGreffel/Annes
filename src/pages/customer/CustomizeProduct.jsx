import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import { FIREBASE_DB } from "../../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import IngredientCheckbox from "../../components/IngredientCheckbox";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../../helperfunctions/DefaultToastSettings";

const CustomizeProduct = () => {
  const { productName } = useParams();
  const [productInfo, setProductInfo] = useState();
  const [defaultIngredients, setDefaultIngredients] = useState();
  const [amount, setAmount] = useState(1);
  const [chosenIngredients, setChosenIngredients] = useState([]);

  useEffect(() => {
    const getProductInfo = () => {
      const unsub = onSnapshot(doc(FIREBASE_DB, "menu", productName), (doc) => {
        setProductInfo(doc.data());
        setDefaultIngredients(doc.data().chosenIngredients);
      });
    };
    getProductInfo();
  }, []);

  const allIngredients = [
    "Kylling (+10)",
    "Bacon (+10)",
    "Æg (+5)",
    "Rejer (+10)",
    "Kalkundelle (+10)",
    "Ananas",
    "Seranoskinke (+10)",
    "Mozzarella (+5)",
    "Laks (+10)",
    "Skinke (+10)",
    "Ost (+5)",
    "Chorizo (+10)",
    "Soltørrede tomater",
    "Brasolo (+10)",
    "jalapeños",
    "Tunsalat (+10)",
    "Guf (+5)",
    "Frikadelle (+10)",
    "Rødkål",
    "Avocado (+5)",
  ];

  const handleAmountIncrease = () => {
    setAmount((amount) => amount + 1);
  };

  const handleAmountDecrease = () => {
    if (amount > 1) {
      setAmount((amount) => amount - 1);
    } else {
      toast.error("Kan ikke tilføje mindre end 1", DefaultToastifySettings);
    }
  };

  return (
    <>
      <CustomerHeader iconLeft="fa-solid fa-circle-arrow-left" iconRight="fa-solid fa-basket-shopping" />
      <PageWrapperContainer>
        <img className="full-width mt-5" src={productInfo?.imageURL} alt={`Billede af ${productInfo?.name}`} />
        <div className="breakout md:w-3/6 md:m-auto md:flex md:flex-col">
          <div className="mt-8">
            <h1 className="text-3xl font-bold">{productInfo?.name}</h1>
            <div className="flex flex-col w-fit mt-5">
              <label className="text-lg font-semibold mb-1" htmlFor="breadSelect">
                Vælg brød
              </label>
              <select
                className="border-2 border-dark rounded-full w-full py-1 px-3 font-medium"
                name="breadSelect"
                id="breadSelect"
              >
                {productInfo?.chosenBreadTypes?.map((bread, key) => {
                  return (
                    <option key={key} value={bread}>
                      {bread}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mt-5">
              <label className="text-lg font-semibold" htmlFor="ingredientsForm">
                Standard ingredienser
              </label>
              <form name="ingredientsForm" className="grid grid-cols-2 w-full mt-1">
                {defaultIngredients?.map((ingredient, key) => {
                  return (
                    <div key={key} className="flex items-center gap-1 py-2 md:py-1">
                      <input type="checkbox" name={ingredient} value={ingredient} id={`${ingredient}`} />
                      <label className="font-medium" htmlFor={ingredient}>
                        {ingredient}
                      </label>
                    </div>
                  );
                })}
              </form>
            </div>
            <div className="mt-5">
              <h2 className="mb-2 text-lg font-semibold">Vælg dressing</h2>
              <div className="flex flex-col gap-3 w-2/3">
                <div className="flex flex-row w-full items-center justify-between gap-3">
                  <label htmlFor="dressingSelect">Top</label>
                  <select
                    className="border-2 border-dark rounded-full py-1 px-3 font-medium w-fit"
                    name="dressingSelect"
                    id="dressingSelect"
                    defaultValue="mayo"
                  >
                    <option value="mayo">Mayo</option>
                    <option value="karry">Karry</option>
                    <option value="pesto">Grøn pesto</option>
                    <option value="chilimayo">Chilimayo +5 kr.</option>
                  </select>
                </div>
                <div className="flex flex-row w-full items-center justify-between gap-3">
                  <label htmlFor="dressingSelect">Bund</label>
                  <select
                    className="border-2 border-dark rounded-full w-fit py-1 px-3 font-medium"
                    name="dressingSelect"
                    id="dressingSelect"
                    defaultValue="mayo"
                  >
                    <option value="mayo">Mayo</option>
                    <option value="karry">Karry</option>
                    <option value="pesto">Grøn pesto</option>
                    <option value="chilimayo">Chilimayo +5 kr.</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-lg font-semibold">Ekstra fyld*</h2>
              <form className="grid grid-cols-2 w-full mt-2 gap-2">
                {allIngredients.map((ingredient, key) => {
                  return (
                    <div key={key} className="flex items-center py-2 gap-1 md:py-1">
                      <IngredientCheckbox ingredient={ingredient} />
                    </div>
                  );
                })}
              </form>
              <p className="mt-3">
                * Ved mange tilvalg på bestillingen kan der forekomme merpris ved betaling i butikken.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Vælg antal</h2>
            <div className="flex items-center gap-4 select-none mt-1">
              <i onClick={handleAmountDecrease} className="fa-solid fa-circle-minus text-xl"></i>
              <p className="font-bold text-2xl">{amount}</p>
              <i onClick={handleAmountIncrease} className="fa-solid fa-circle-plus text-xl"></i>
            </div>
          </div>
        </div>
      </PageWrapperContainer>
    </>
  );
};

export default CustomizeProduct;