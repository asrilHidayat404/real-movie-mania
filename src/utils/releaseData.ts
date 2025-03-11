function parseReleaseDate(released: string) {
  const releasedArray = Array.from(released);

  const getYear = () => releasedArray.slice(0, 4).join("");
  const getMonth = () => releasedArray.slice(5, 7).join("");
  const getDate = () => releasedArray.slice(-2).join("");

  return {
    date: getDate(),
    month: getMonth(),
    year: getYear(),
  };
}

export default parseReleaseDate;
