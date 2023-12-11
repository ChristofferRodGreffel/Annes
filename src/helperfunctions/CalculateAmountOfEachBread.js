export function CalculateAmountOfEachBread(allBasketProducts) {

    const breadTypesObj = [
        { Name: "Mørkt", shortName: "M", amount: 0 },
        { Name: "Lyst", shortName: "L", amount: 0 },
        { Name: "Bolle", shortName: "B", amount: 0 },
        { Name: "Fiber bolle", shortName: "FB", amount: 0 },
        { Name: "Bagel", shortName: "BA", amount: 0 },
        { Name: "Glutenfri", shortName: "GF", amount: 0 },
        { Name: "Trekantsandwich", shortName: "T", amount: 0 }
    ]

    breadTypesObj.forEach((breadType) => {
        allBasketProducts.filter(item => item.bread === breadType.Name).forEach(product => {
            breadType.amount += product.amount
        })
    })

    return breadTypesObj
}
