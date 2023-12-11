export function sortOrderArrays(allArrays, sortType) {
  const allArraysNotUndefined = allArrays.filter((arr) => arr.state !== undefined);

  switch (sortType) {
    case "nyesteFørst":
      return allArraysNotUndefined.map((arr) => {
        return {
          ...arr,
          state: arr.state.slice().sort((a, b) => {
            return b.orderPlacedAt - a.orderPlacedAt;
          }),
        };
      });
      break;

    case "ældsteFørst":
      return allArraysNotUndefined.map((arr) => {
        return {
          ...arr,
          state: arr.state.slice().sort((a, b) => {
            return a.orderPlacedAt - b.orderPlacedAt;
          }),
        };
      });
      break;

    case "afhentesFørst":
      return allArraysNotUndefined.map((arr) => {
        return {
          ...arr,
          state: arr.state.slice().sort((a, b) => {
            if (a.pickup.time === "Hurtigst muligt") {
              return -1;
            } else if (b.pickup.time === "Hurtigst muligt") {
              return 1;
            } else {
              return a.pickup.time - b.pickup.time;
            }
          }),
        };
      });
      break;

    default:
      return allArraysNotUndefined;
  }
}
