import React, { useRef, useState } from "react";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import PageH1Title from "../../components/PageH1Title";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import AdminSidebar from "../../components/AdminSidebar";
import AdminContentWrapper from "../../components/AdminContentWrapper";

function CreateMenuProduct() {
  const formRef = useRef(null);

  // skal evt. komme fra Firebase
  const breadTypes = [{ name: "Lyst" }, { name: "Mørkt" }];

  const [checkedBreadTypes, setCheckedBreadTypes] = useState(new Array(breadTypes.length).fill(false));

  const handleOnBreadtypeChange = (position) => {
    const updatedCheckedState = checkedBreadTypes.map((item, index) => (index === position ? !item : item));
    setCheckedBreadTypes(updatedCheckedState);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    let productName = formRef.current.productName.value;

    let checkedBreadOptions = [];

    checkedBreadTypes.forEach((checked, index) => {
      if (checked === true) {
        checkedBreadOptions.push(breadTypes[index].name);
      }
    });

    console.log(checkedBreadOptions);
  };

  return (
    <>
      <div className="flex flex-row">
        <AdminSidebar />
        <AdminContentWrapper>
          <PageH1Title>Tilføj nyt produkt</PageH1Title>
          <form ref={formRef} onSubmit={handleAddProduct}>
            <CustomInputWithLabel
              label="Navn på product"
              type="text"
              name="productName"
              placeholder="Skriv produkt navn"
            />
            <CustomInputWithLabel
              type="checkbox"
              CustomHandleChange={handleOnBreadtypeChange}
              CustomCheckedItems={checkedBreadTypes}
              CustomOptions={breadTypes}
            />

            <button type="submit">Tilføj</button>
          </form>
        </AdminContentWrapper>
      </div>
    </>
  );

  return (
    <div className="flex flex-col m-10">
      <PageH1Title>Tilføj nyt produkt</PageH1Title>
    </div>
  );
}

export default CreateMenuProduct;
