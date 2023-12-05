import React from "react";

const CheckoutProduct = ({ product }) => {
  return (
    <div>
      <hr />
      <div>
        <h2>{product.name}</h2>
        <div className="flex items-center gap-4 select-none mt-1">
          <i
            onClick={product.decrease}
            className={`fa-solid fa-circle-minus text-xl ${product.amount === 1 && `text-grey`}`}
          ></i>
          <p className="font-bold text-2xl">{product.amount}</p>
          <i onClick={product.increase} className="fa-solid fa-circle-plus text-xl"></i>
        </div>
      </div>
      <div>
        <div>
          <p>
            <b>Brød:</b> {product.bread}
          </p>
          <p>
            <b>Dressing Top:</b> {product.dressing.top}
          </p>
          <p>
            <b>Dressing Bund:</b> {product.dressing.bottom}
          </p>
        </div>
        <div>
          <div>
            {product?.added?.map((ingredient, key) => {
              return (
                <div key={key}>
                  <i className="fa-solid fa-circle-plus text-green"></i>
                  <p>{ingredient}</p>
                </div>
              );
            })}
            {product?.removed?.map((ingredient, key) => {
              return (
                <div key={key}>
                  <i className="fa-solid fa-circle-minus text-red"></i>
                  <p>{ingredient}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div>
            <button>Ret</button>
            <button>Slet</button>
          </div>
          <div>
            <p>{product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
