import React, { useState, useEffect } from "react";

const OpeningHoursSelect = (props) => {
  const [openingHours, setOpeningHours] = useState([]);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, and so on
  const todayHour = new Date().getHours();
  const todayMinute = new Date().getMinutes();

  const [shopIsClosed, setShopIsClosed] = useState(false);
  const currentDate = new Date();

  const shopClosingTime = 1830;

  const handleChangeTime = (e) => {
    e.preventDefault();
    const time = e.target.value;
    props.setChosenCollectionTime(time);
  };

  useEffect(() => {
    if (
      currentDate.toLocaleDateString() === props.chosenCollectionDate.toLocaleDateString() &&
      `${Number(currentDate.getHours())}${Number(currentDate.getMinutes())}` >= shopClosingTime
    ) {
      setShopIsClosed(true);
    } else {
      setShopIsClosed(false);
    }
  }, [props, currentDate]);

  useEffect(() => {
    // Function to calculate the opening hours based on the current day
    const calculateOpeningHours = () => {
      const currentDay = daysOfWeek[today];
      let isWeekend =
        today === 0 ||
        today === 6 ||
        props.chosenCollectionDate.getDay() === 0 ||
        props.chosenCollectionDate.getDay() === 6; // Sunday or Saturday

      // Define opening hours based on the current day
      const startHour = !isWeekend ? 7 : 10;
      const endHour = 18;

      const openingHoursArray = currentDate.toLocaleDateString() === props.chosenCollectionDate.toLocaleDateString() ? ["Hurtigst muligt"] : [];

      // const openingHoursArray = ["Hurtigst muligt"];

      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 10) {
          // Stopper listen efter 18.40
          if (hour === endHour && minute > 45) {
            break;
          }

          // Tjekker om man har valgt den akutelle dag
          if (currentDate.toLocaleDateString() === props.chosenCollectionDate.toLocaleDateString()) {
            // sørger for at man ikke kan vælge en tid om mindre end 10 min.
            if (hour < todayHour || (hour === todayHour && minute < todayMinute + 10)) {
              continue;
            }
          }

          const formattedHour = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
          openingHoursArray.push(formattedHour);
        }
      }

      setOpeningHours(openingHoursArray);
    };

    calculateOpeningHours();
  }, [props]);

  return (
    <div className="flex flex-col gap-2">
      {shopIsClosed ? (
        <>
          <p className="text-sm italic">Det er desværre for sent at bestille til i dag.</p>
        </>
      ) : (
        <>
          <label className="font-semibold">Vælg afhentningstid*</label>
          <select
            className="px-4 py-2 border-2 border-dark rounded-lg"
            onChange={(e) => {
              handleChangeTime(e);
            }}
            value={props.chosenCollectionTime}
          >
            {openingHours.map((hour, index) => (
              <option key={index} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          {props.chosenCollectionTime == "Hurtigst muligt" && (
            <p className="text-sm italic">
              Vi begynder på ordren så snart vi har tid, og du får besked når den er klar. Oftest tager det 5-20 min.
              afhængig af størrelsen.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default OpeningHoursSelect;
