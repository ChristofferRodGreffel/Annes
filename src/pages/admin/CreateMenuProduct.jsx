import React, { useRef, useState } from "react";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import PageH1Title from "../../components/PageH1Title";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import AdminSidebar from "../../components/AdminSidebar";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import { compare } from "../../helperfunctions/Compare";

function CreateMenuProduct() {
    const formRef = useRef(null);

    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [chosenBreadTypes, setChosenBreadTypes] = useState([])
    const [chosenIngredients, setChosenIngredients] = useState([])

    // skal evt. komme fra Firebase
    const breadTypes =
        [
            { name: "Bagel" },
            { name: "Bolle" },
            { name: "Fiber bolle" },
            { name: "Lyst" },
            { name: "Mørkt" },
            { name: "Trekantsandwich" },
        ]

    const [checkedBreadTypes, setCheckedBreadTypes] = useState(new Array(breadTypes.length).fill(false));

    const handleOnBreadtypeChange = (position, name) => {
        const updatedCheckedState = checkedBreadTypes.map((item, index) => (index === position ? !item : item));
        setCheckedBreadTypes(updatedCheckedState);

        const addObject = {
            name: name
        }

        if (updatedCheckedState[position] === true) {
            const updatedArray = [...chosenBreadTypes, addObject]
            // find compare function in helperfunctions folder "Compare.js"
            const sorted = [...updatedArray].sort(compare)
            setChosenBreadTypes(sorted);

        } else {
            setChosenBreadTypes(chosenBreadTypes.filter(item => item.name !== addObject.name));
        }
    }

    let ingredients =
        [
            { name: "Agurk" },
            { name: "Gulerod" },
            { name: "Løg" },
            { name: "Salat" },
            { name: "Tomat" },
        ]

    const [checkedIngredients, setCheckedIngredients] = useState(new Array(ingredients.length).fill(false));


    const handleOnIngredientsChange = (position, name) => {
        const updatedCheckedState = checkedIngredients.map((item, index) => (index === position ? !item : item));
        setCheckedIngredients(updatedCheckedState);

        const addObject = {
            name: name
        }

        if (updatedCheckedState[position] === true) {
            const updatedArray = [...chosenIngredients, addObject]
            // find compare function in helperfunctions folder "Compare.js"
            const sorted = [...updatedArray].sort(compare)
            setChosenIngredients(sorted);
        } else {
            setChosenIngredients(chosenIngredients.filter(item => item.name !== addObject.name));
        }
    }

    const handleAddCustomIngredient = (e) => {
        e.preventDefault()

        let ingredient = formRef.current.customIngredientsName.value

        const capitalizedFirstLetterIngredient =
            ingredient.charAt(0).toUpperCase()
            + ingredient.slice(1).toLowerCase()

        const addObject = {
            name: capitalizedFirstLetterIngredient
        }
        setChosenIngredients([
            ...chosenIngredients,
            addObject
        ]);

        formRef.current.customIngredientsName.value = ""
    }

    const handleAddProduct = (e) => {
        e.preventDefault();

        console.log(productName,
            productPrice,
            chosenBreadTypes,
            chosenIngredients,)
    };

    return (
        <>
            <div className="flex flex-row">
                <AdminSidebar />
                <AdminContentWrapper>
                    <PageH1Title>Tilføj nyt produkt</PageH1Title>
                    <div className="flex gap-40">
                        <div className="w-3/5">
                            <form ref={formRef} onSubmit={handleAddProduct}>
                                <CustomInputWithLabel
                                    label="Navn på product"
                                    type="text"
                                    value={productName}
                                    customSetvalue={setProductName}
                                    name="productName"
                                    placeholder="Skriv produkt navn"
                                />
                                <CustomInputWithLabel
                                    title="Vælg tilgængelige brødtyper"
                                    type="checkbox"
                                    CustomHandleChange={handleOnBreadtypeChange}
                                    CustomCheckedItems={checkedBreadTypes}
                                    CustomOptions={breadTypes}
                                />
                                <CustomInputWithLabel
                                    title="Vælg grundingredienser"
                                    type="checkbox"
                                    CustomHandleChange={handleOnIngredientsChange}
                                    CustomCheckedItems={checkedIngredients}
                                    CustomOptions={ingredients}
                                />
                                <CustomInputWithLabel
                                    button={true}
                                    buttonText="Tilføj ingrediens"
                                    customOnClick={handleAddCustomIngredient}
                                    label="Tilføj ingredienser manuelt"
                                    type="text"
                                    name="customIngredientsName"
                                    placeholder="Tilføj en ingrediens her..."
                                />
                                <CustomInputWithLabel
                                    label="Tilføj pris på produkt"
                                    value={productPrice}
                                    customSetvalue={setProductPrice}
                                    type="text"
                                    name="productPrice"
                                    placeholder="Pris på produkt..."
                                />

                                <button type="submit">Tilføj produkt til menu</button>
                            </form>
                        </div>

                        <div className="bg-mainGrey w-full p-8">
                            <div className="flex flex-col mb-2">
                                <p className="font-bold">Navn</p>
                                {productName ?
                                    <>
                                        <p>{productName}</p>
                                    </>
                                    :
                                    <>
                                        <p>Ikke sat</p>
                                    </>
                                }
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Pris</p>
                                {productPrice ?
                                    <>
                                        <p>{productPrice} kr.</p>
                                    </>
                                    :
                                    <>
                                        <p>Ikke sat</p>
                                    </>
                                }
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Brød</p>
                                {chosenBreadTypes.length != 0 ?
                                    <>
                                        {chosenBreadTypes.map((bread) => {
                                            return (
                                                <>
                                                    <p>{bread.name}</p>
                                                </>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <p>Ikke sat</p>
                                    </>
                                }
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Ingredienser</p>
                                {chosenIngredients.length != 0 ?
                                    <>
                                        {chosenIngredients.map((ingredient) => {
                                            return (
                                                <>
                                                    <p>{ingredient.name}</p>
                                                </>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <p>Ikke sat</p>
                                    </>
                                }
                            </div>



                        </div>
                    </div>

                </AdminContentWrapper>
            </div>
        </>
    );
}

export default CreateMenuProduct;
