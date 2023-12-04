import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import { FIREBASE_DB } from "../../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import PageH1Title from "../../components/PageH1Title";

const CustomizeProduct = () => {
  const { productName } = useParams();
  const [productInfo, setProductInfo] = useState();

  useEffect(() => {
    const getProductInfo = () => {
      const unsub = onSnapshot(doc(FIREBASE_DB, "menu", productName), (doc) => {
        setProductInfo(doc.data());
      });
    };
    getProductInfo();
  }, []);

  return (
    <>
      <CustomerHeader iconLeft="fa-solid fa-circle-arrow-left" iconRight="fa-solid fa-basket-shopping" />
      <PageWrapperContainer>
        <img className="full-width mt-5" src={productInfo?.imageURL} alt={`Billede af ${productInfo?.name}`} />
        <div className="mt-8">
          <h1 className="text-3xl font-bold">{productInfo?.name}</h1>
          <div className="flex flex-col w-fit">
            <label htmlFor="breadSelect">Vælg brød</label>
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
          <div>
            <label htmlFor="ingredientsForm">Standard ingredienser</label>
            <form name="ingredientsForm" className="grid grid-cols-2 w-fit">
              {productInfo?.chosenIngredients?.map((ingredient, key) => {
                return (
                  <div key={key} className="flex items-center gap-1">
                    <input type="checkbox" name={ingredient} value={ingredient} id={`${ingredient}`} />
                    <label htmlFor={ingredient}>{ingredient}</label>
                  </div>
                );
              })}
            </form>
          </div>
          <div className="flex flex-row w-fit">
            <label htmlFor="dressingSelect">Top</label>
            <select
              className="border-2 border-dark rounded-full w-full py-1 px-3 font-medium"
              name="dressingSelect"
              id="dressingSelect"
            >
              <option value="almindelig">Almindelig</option>
              <option value="karry">Karry</option>
            </select>
          </div>
        </div>
      </PageWrapperContainer>
    </>
  );
};

export default CustomizeProduct;
