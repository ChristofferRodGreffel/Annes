import React from "react";

const IngredientCheckbox = (props) => {
  return (
    <>
      <input type="checkbox" name={`checkbox-${props.ingredient}`} id={`checkbox-${props.ingredient}`} />
      <label className="font-medium" htmlFor={`checkbox-${props.ingredient}`}>
        {props.ingredient}
      </label>
    </>
  );
};

export default IngredientCheckbox;
