import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CustomerBottomInfoContainer(props) {
  const [amountOfChosenProducts, setAmountOfChosenProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if(props.amount && props.price) {
      setAmountOfChosenProducts(props.amount)
      setTotalPrice(props.price)
    }
  }, [props])

  return (
    <>
      {amountOfChosenProducts !== 0 && (
        <div className="z-20 bg-dark h-20 p-3 fixed bottom-0 w-screen flex justify-center gap-10 items-center">
          <div className="text-white">
            {props.amount && <p>{amountOfChosenProducts} stk.</p>}
            <p className="text-3xl font-semibold">{props.price ? props.price : totalPrice} kr.</p>
          </div>

          <button onClick={props.function}>
            <div className="text-white bg-primary px-8 py-2 rounded-full font-semibold">{props.text}</div>
          </button>
        </div>
      )}
    </>
  );
}

export default CustomerBottomInfoContainer;
