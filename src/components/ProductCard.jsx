import React from "react";

const ProductCard = (props) => {
  return (
    <div className="rounded-xl overflow-clip text-white">
      <img
        loading="lazy"
        className="h-32 w-full object-cover"
        src={props.imageSource}
        alt={`Billede af ${props.imageName}`}
      />
      <div className="bg-primary productOverviewMinHeight">
        <div className="flex flex-col justify-evenly h-auto min-h-[132px] w-full px-5 py-3 lg:w-96">
          <h3 className="font-bold text-xl mb-3">{props.productName}</h3>
          <button className="bg-white text-dark font-semibold p-1.5 w-full rounded-md text-lg">
            Tilpas <i className="fa-solid fa-utensils"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
