import React from "react";

const IngredientCheckbox = (props) => {
  return (
    <div className="flex flex-row items-center py-2 gap-1 md:py-1">
      <input
        onChange={(e) => props.onChange(props.ingredient, e)}
        type="checkbox"
        name={`checkbox-${props.ingredient.name}`}
        value={props.ingredient.name}
        id={`checkbox-${props.ingredient.name}`}
      />
      <label className="font-medium customBalance" htmlFor={`checkbox-${props.ingredient.name}`}>
        {props.ingredient.name} {props.ingredient.price != 0 && `(${props.ingredient.price} kr.)`}
      </label>
    </div>
  );
};

export default IngredientCheckbox;
