export function CheckIfShopIsClosed(chosenCollectionDate, setShopIsClosed) {

    const shopClosingTime = 1830;
    const currentDate = new Date();

    const chosenCollectionDateFormatted = chosenCollectionDate.toLocaleDateString()

    const currentDateFormatted = currentDate.toLocaleDateString()
    const currentTimeHourFormatted = currentDate.getHours().toString().padStart(2, "0")
    const currentTimeMinuteFormatted = currentDate.getMinutes().toString().padStart(2, "0")

    const currentTimeHourAndMinuteFormatted = Number(`${currentTimeHourFormatted}${currentTimeMinuteFormatted}`)

    if (
        currentDateFormatted === chosenCollectionDateFormatted &&
        currentTimeHourAndMinuteFormatted >= shopClosingTime
    ) {
        setShopIsClosed(true);
    } else {
        setShopIsClosed(false);
    }
}
