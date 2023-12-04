import React, { useEffect, useRef, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import PageH1Title from "../../components/PageH1Title";
import BackButtonWithArrow from "../../components/BackButtonWithArrow";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import CustomButton from "../../components/CustomButton";
import { doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";

const Ingredients = () => {
  const [ingredient, setIngredient] = useState("");
  const [allIngredients, setAllIngredients] = useState();
  const { formRef } = useRef();

  useEffect(() => {
    const getIngredients = () => {
      const unsub = onSnapshot(doc(FIREBASE_DB, "ingredients/default"), (doc) => {
        const newIngredients = [];
        newIngredients.push(doc.data());
        setAllIngredients(newIngredients);
      });
    };
    getIngredients();
  });

  return (
    <>
      <div className="flex justify-center flex-row">
        <AdminSidebar />
        <AdminContentWrapper>
          <BackButtonWithArrow linkText="Tilbage til valgmuligheder" linkTo="/menu-oversigt" />
          <PageH1Title>Ingredienser</PageH1Title>
          <p>
            Her kan du administrere listen af ingredienser som brugeren kan vælge imellem. <br />
            Du kan tilføje og slette ingredienser efter behov.
          </p>
          <div className="flex flex-col gap-10 mt-8">
            <div>
              <form ref={formRef} className="flex flex-col gap-2">
                <CustomInputWithLabel
                  label="Tilføj ny ingrediens"
                  type="text"
                  value={ingredient}
                  customSetvalue={setIngredient}
                  name="addNewIngredient"
                  placeholder="Skriv ingrediens her..."
                />
                <CustomButton title={"Tilføj ingrediens"} type="submit" />
              </form>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Dine nuværende ingredienser</h2>
              <hr className="border-b-2 border-dark rounded-full" />
              <div>
                {allIngredients?.length != 0 ? (
                  <>
                    {allIngredients?.map((ingredient, key) => {
                      return (
                        <ul className="list-disc list-inside flex items-center justify-between w-56" key={key}>
                          <li>{ingredient.name}</li>
                          <i className="fa-solid fa-circle-minus text-red text-lg cursor-pointer"></i>
                        </ul>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <p className="italic">Ikke sat...</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </AdminContentWrapper>
      </div>
    </>
  );
};

export default Ingredients;
