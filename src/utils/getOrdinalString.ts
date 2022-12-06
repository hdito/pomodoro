export const getOrdinalString = (number: number) => {
  const convertedNumber = number.toLocaleString();

  if (number % 10 == 1 && number % 100 != 11) {
    return convertedNumber + "st";
  } else if (number % 10 == 2 && number % 100 != 12) {
    return convertedNumber + "nd";
  } else if (number % 10 == 3 && number % 100 != 13) {
    return convertedNumber + "rd";
  }
  return convertedNumber + "th";
};
