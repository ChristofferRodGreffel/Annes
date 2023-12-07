import React, { useState } from "react";

const ProductCard = (props) => {

  const [loadedImage, setLoadedImage] = useState(false)
  
  return (
    <div className="rounded-xl overflow-clip text-white md:w-[350px]">

      <img
        loading="lazy"
        className={`h-28 w-full object-cover ${loadedImage ? null : 'blur-lg'}`}
        src={props.imageSource}
        alt={`Billede af ${props.imageName}`}
        onLoad={() => {setLoadedImage(true)}}
      />
      <div className="bg-primary productOverviewMinHeight">
        <div className="flex flex-col justify-evenly h-auto min-h-[125px] w-full px-5 py-3 lg:w-[350px]">
          <h3 className="font-bold text-xl mb-3 customBalance">{props.productName}</h3>
          <button onClick={props.function} className="bg-white text-dark font-semibold p-1.5 w-full rounded-md text-lg">
            {props.text} {props.icon && <i className={props.icon}></i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
