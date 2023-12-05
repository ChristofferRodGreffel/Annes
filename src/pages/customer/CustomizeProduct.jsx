import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import { FIREBASE_DB } from "../../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import IngredientCheckbox from "../../components/IngredientCheckbox";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../../helperfunctions/DefaultToastSettings";
import CustomerBottomInfoContainer from "../../components/CustomerBottomInfoContainer";
import localStorageBasket from "../../helperfunctions/LocalStorageBasket";

const CustomizeProduct = () => {
  const { productName } = useParams();
  const [productInfo, setProductInfo] = useState();
  const [defaultIngredients, setDefaultIngredients] = useState();
  const [allIngredients, setAllIngredients] = useState();
  const [amount, setAmount] = useState(1);
  const [chosenBread, setChosenBread] = useState("Mørkt");
  const [dressingTop, setDressingTop] = useState("Mayo");
  const [dressingBottom, setDressingBottom] = useState("Mayo");
  const [totalPrice, setTotalPrice] = useState();
  const [productPrice, setProductPrice] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getProductInfo = () => {
      const unsub = onSnapshot(doc(FIREBASE_DB, "menu", productName), (doc) => {
        setProductInfo(doc.data());
        setDefaultIngredients(doc.data().chosenIngredients);
        setTotalPrice(doc.data().price);
        setProductPrice(doc.data().price);
      });
    };

    const getAllIngredients = () => {
      const unsub = onSnapshot(doc(FIREBASE_DB, "ingredients/default"), (doc) => {
        setAllIngredients(doc.data().ingredients);
      });
    };

    getAllIngredients();
    getProductInfo();
  }, []);

  const handleAmountIncrease = () => {
    setAmount((amount) => amount + 1);
    setTotalPrice((price) => price + productPrice);
  };

  const handleAmountDecrease = () => {
    if (amount > 1) {
      setAmount((amount) => amount - 1);
      setTotalPrice((price) => price - productPrice);
    } else {
      toast.error("Vælg mindst én af denne slags", DefaultToastifySettings);
    }
  };

  const handleAddProduct = () => {
    const defaultIngredients = document.querySelectorAll("#defaultIngredients input[type='checkbox']");
    const extraIngredientsForm = document.querySelectorAll("#extraIngredients input[type='checkbox']");

    const removedDefaultIngredients = [];
    const extraIngredients = [];

    // Getting the value of all unchecked boxes in the defaultIngredients form
    defaultIngredients.forEach((box) => {
      if (!box.checked) {
        removedDefaultIngredients.push(box.value);
      }
    });

    extraIngredientsForm.forEach((box) => {
      if (box.checked) {
        extraIngredients.push(box.value);
      }
    });

    const completeProduct = {
      removed: removedDefaultIngredients,
      added: extraIngredients,
      dressing: {
        top: dressingTop,
        bottom: dressingBottom,
      },
      price: productPrice * amount,
      amount: amount,
      bread: chosenBread,
      name: productName,
    };

    localStorageBasket(completeProduct);
    toast.success("Produkt tilføjet", DefaultToastifySettings);
    navigate("/");
  };

  const handleExtraIngredientChange = (ingredient, e) => {
    if (e.target.checked) {
      if (ingredient.price !== 0) {
        setProductPrice((prevPrice) => prevPrice + ingredient.price);
      }
    } else {
      if (ingredient.price !== 0) {
        setProductPrice((prevPrice) => prevPrice - ingredient.price);
      }
    }
  };

  return (
    <>
      <CustomerHeader iconLeft="fa-solid fa-circle-arrow-left" iconRight="fa-solid fa-basket-shopping" />
      <PageWrapperContainer>
        <img
          className="full-width mt-5 md:content h-56"
          src={productInfo?.imageURL}
          alt={`Billede af ${productInfo?.name}`}
        />

        <div className="breakout mb-28 md:w-3/6 md:m-auto md:flex md:flex-col">
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
                value={chosenBread}
                onChange={(e) => setChosenBread(e.target.value)}
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
              <form name="ingredientsForm" id="defaultIngredients" className="grid grid-cols-2 w-full mt-1">
                {defaultIngredients?.map((ingredient, key) => {
                  return (
                    <div key={key} className="flex items-center gap-1 py-2 md:py-1">
                      <input type="checkbox" name={ingredient} value={ingredient} id={`${ingredient}`} defaultChecked />
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
                    defaultValue={"Mayo"}
                    onChange={(e) => setDressingTop(e.target.value)}
                  >
                    <option value="Fravalgt">Ingen dressing</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Karry">Karry</option>
                    <option value="Pesto">Grøn pesto</option>
                    <option value="Chilimayo">Chilimayo +5 kr.</option>
                  </select>
                </div>
                <div className="flex flex-row w-full items-center justify-between gap-3">
                  <label htmlFor="dressingSelect">Bund</label>
                  <select
                    className="border-2 border-dark rounded-full w-fit py-1 px-3 font-medium"
                    name="dressingSelect"
                    id="dressingSelect"
                    defaultValue="Mayo"
                    onChange={(e) => setDressingBottom(e.target.value)}
                  >
                    <option value="Fravalgt">Ingen dressing</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Karry">Karry</option>
                    <option value="Pesto">Grøn pesto</option>
                    <option value="Chilimayo">Chilimayo +5 kr.</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-lg font-semibold">Ekstra fyld*</h2>
              <form id="extraIngredients" className="grid grid-cols-2 w-full mt-2 gap-2">
                {allIngredients?.map((ingredient, key) => {
                  return (
                    <div key={key}>
                      <IngredientCheckbox
                        ingredient={ingredient}
                        value={ingredient}
                        onChange={handleExtraIngredientChange}
                      />
                    </div>
                  );
                })}
              </form>
              <p className="mt-3">*Ved mange tilvalg på bestillingen kan der forekomme merpris ved betaling.</p>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Vælg antal</h2>
            <div className="flex items-center justify-between min-w-[95px] w-fit select-none mt-1">
              <i
                onClick={handleAmountDecrease}
                className={`fa-solid fa-circle-minus text-xl ${amount === 1 && `text-grey`}`}
              ></i>
              <p className="font-bold text-2xl">{amount}</p>
              <i onClick={handleAmountIncrease} className="fa-solid fa-circle-plus text-xl"></i>
            </div>
          </div>
        </div>
        <CustomerBottomInfoContainer
          function={handleAddProduct}
          customNavigate={navigate}
          showAmount={false}
          text="Tilføj til kurv"
          price={productPrice * amount}
          amount={amount}
        />
      </PageWrapperContainer>
    </>
  );
};

export default CustomizeProduct;
