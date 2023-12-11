export function sortOrderArrays(
  allArrays,
  sortType,
  setRecievedOrders,
  setAcceptedOrders,
  setReadyOrders,
  setPickedOrders,
  setUserCancelledOrders,
  setShopCancelledOrders
) {
  const allArraysNotUndefined = [];

  allArrays.forEach((arr) => {
    if (arr.state !== undefined) {
      allArraysNotUndefined.push(arr);
    }
  });

  //   console.log(allArraysNotUndefined);

  switch (sortType) {
    case "nyesteFørst":
      allArraysNotUndefined.forEach((arr) => {
        return arr.state.sort((a, b) => {
          console.log("First pickup time", a.pickup.time, "Second pickup time", b.pickup.time);
          a.pickup.time - b.pickup.time;
        });
      });
      break;

    case "afhentesFørst":
      break;

    default:
      break;
  }
}
