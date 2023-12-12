import React from "react";

const OrderDetailsProduct = (props) => {
  const convertBreadType = (bread) => {
    switch (bread) {
      case "Glutenfri":
        return "GF";

      case "Bolle":
        return "B";

      case "Trekantsandwich":
        return "TS";

      case "Glutenfri":
        return "GF";

      case "Mørkt":
        return "M";

      case "Lyst":
        return "L";

      case "Fiber bolle":
        return "FB";

      case "Bagel":
        return "BA";

      default:
        break;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-56">
          <p className="text-md font-semibold max-w-[250px]">
            {props.order.amount} x {props.order.name}
          </p>
          <div>
            {props.order.dressing.top !== "Mayo" && (
              <div className="flex justify-between mt-1 gap-2">
                <p className="font-semibold">Dressing top:</p>
                <p className="text-green font-semibold">{props.order.dressing.top}</p>
              </div>
            )}
            {props.order.dressing.bottom !== "Mayo" && (
              <div className="flex justify-between gap-2">
                <p className="font-semibold">Dressing bund:</p>
                <p className="text-green font-semibold">{props.order.dressing.bottom}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {props.order.added.length == 0 && props.order.removed.length == 0 && <p>Ingen ændringer</p>}
          {props.order.added.length !== 0 && (
            <ul>
              {props.order.added.map((ingredient) => {
                return (
                  <li>
                    <i className="fa-solid fa-circle-plus text-green text-md pr-1"></i>
                    {ingredient}
                  </li>
                );
              })}
            </ul>
          )}
          {props.order.removed.length !== 0 && (
            <ul>
              {props.order.removed.map((ingredient) => {
                return (
                  <li>
                    <i className="fa-solid fa-circle-minus text-red text-md pr-1"></i>
                    {ingredient}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div>
          <p className="text-xl font-semibold">{convertBreadType(props.order.bread)}</p>
        </div>
      </div>
      <hr className="border-1 border-dashed border-dark my-4" />
    </>
  );
};

export default OrderDetailsProduct;
