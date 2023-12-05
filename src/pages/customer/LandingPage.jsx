import React, { useEffect, useState } from "react";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import CustomerHeader from "../../components/CustomerHeader";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebase-config";
import ProductCard from "../../components/ProductCard";
import { PulseLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import CustomerBottomInfoContainer from "../../components/CustomerBottomInfoContainer";
import PageH1Title from "../../components/PageH1Title";

function LandingPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { productName } = useParams();

  const [amountFromBasket, setAmountFromBasket] = useState(0)
  const [priceFromBasket, setPriceFromBasket] = useState(0)

  useEffect(() => {
    const basketFromStorage = JSON.parse(localStorage.getItem("customerCheckout"));

    if (basketFromStorage) {
      var totalPriceFromBasket = 0;
      var totalAmountFromBasket = 0;

      basketFromStorage.forEach((subData) => (totalPriceFromBasket += subData.price));
      basketFromStorage.forEach((subData) => (totalAmountFromBasket += subData.amount));

      setPriceFromBasket(totalPriceFromBasket);
      setAmountFromBasket(totalAmountFromBasket);
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      const q = query(collection(FIREBASE_DB, "menu"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newProducts = [];
        querySnapshot.forEach((doc) => {
          newProducts.push(doc.data());
        });
        setAllProducts(newProducts);
        setLoading(false);
      });
    };
    getAllProducts();
  }, []);

  const handleOnProductClick = (productName) => {
    navigate(`/bestil-online/${productName}`);
  };

  return (
    <>
      <CustomerBottomInfoContainer
        text="Gå til kurv"
        amount={amountFromBasket}
        price={priceFromBasket}
        function={() => navigate("/kurv")}
      />
      <CustomerHeader nav={true} iconLeft="fa-solid fa-bars" iconRight="fa-solid fa-basket-shopping" />
      <PageWrapperContainer>
        <div className="mt-16 lg:w-1/3 lg:m-auto lg:mt-16">
          <h2 className="text-center mb-3">Vælg mellem 5-6 brødtypper</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between border-b-2 border-grey border-dashed">
              <p>Sandwich</p>
              <p>Fra 59 kr.</p>
            </div>
            <div className="flex justify-between border-b-2 border-grey border-dashed">
              <p>Boller el. bagel</p>
              <p>Fra 48 kr.</p>
            </div>
            <div className="flex justify-between">
              <p>Trekantsandwich</p>
              <p>Fra 23 kr.</p>
            </div>
          </div>
        </div>
        <div className="breakout flex flex-col gap-5 mt-10 pb-32 md:flex-row md:flex-wrap md:justify-center">
          {!loading ? (
            allProducts?.map((product, key) => {
              return (
                <div key={key}>
                  <ProductCard
                    function={() => handleOnProductClick(product?.name)}
                    text="Tilpas"
                    key={key}
                    imageSource={product?.imageURL}
                    productName={product?.name}
                    icon="fa-solid fa-utensils"
                  />
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center gap-1">
              <p className="font-medium text-xl">Indlæser menu</p>
              <PulseLoader color="#373737" size={13} />
            </div>
          )}
        </div>
      </PageWrapperContainer>
    </>
  );
}

export default LandingPage;
