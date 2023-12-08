import React from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderDocId } = useParams();

  return <div>{orderDocId}</div>;
};

export default OrderDetails;
