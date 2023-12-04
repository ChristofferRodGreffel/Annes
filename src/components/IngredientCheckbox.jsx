import React from "react";

const IngredientCheckbox = (props) => {
  return (
    <>
      <input
        type="checkbox"
        name={`checkbox-${props.ingredient}`}
        value={props.value}
        id={`checkbox-${props.ingredient}`}
      />
      <label className="font-medium customBalance" htmlFor={`checkbox-${props.ingredient}`}>
        {props.ingredient}
      </label>
    </>
  );
};

export default IngredientCheckbox;
