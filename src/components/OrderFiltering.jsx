import React from "react";

const OrderFiltering = (props) => {

  // Udviklet primært af Sebasitan

  // Viser boksen til at admin-brugeren kan sortere
  return (
    <select
      onChange={(e) => {
        props.onChange(e);
      }}
      type="select"
      className="border-dark border-2 rounded-lg px-2"
      defaultValue={"ældsteFørst"}
    >
      <option value="ældsteFørst">Ældste først</option>
      <option value="afhentesFørst">Afhentes først</option>
      <option value="nyesteFørst">Nyeste først</option>
    </select>
  );
};

export default OrderFiltering;
