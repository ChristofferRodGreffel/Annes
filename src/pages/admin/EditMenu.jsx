import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import BackButtonWithArrow from "../../components/BackButtonWithArrow";
import PageH1Title from "../../components/PageH1Title";
import { collection, onSnapshot, query } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";
import { PulseLoader } from "react-spinners";
import ProductCard from "../../components/ProductCard";

const EditMenu = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState([]);

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

  return (
    <>
      <div className="flex justify-center flex-row">
        <AdminSidebar />
        <AdminContentWrapper>
          <BackButtonWithArrow linkText="Tilbage til valgmuligheder" linkTo="/menu-oversigt" />
          <PageH1Title>Rediger Menu</PageH1Title>
          <div className="flex flex-col gap-5 mt-10 md:flex-row md:flex-wrap">
            {!loading ? (
              allProducts?.map((product, key) => {
                return (
                  <div key={key}>
                    <ProductCard
                      text="Rediger produkt"
                      key={key}
                      imageSource={product?.imageURL}
                      productName={product?.name}
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
        </AdminContentWrapper>
      </div>
    </>
  );
};

export default EditMenu;
