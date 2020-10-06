// determines if object is empty
export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// export default isEmpty;

export const sortElements = (data, order = "desc") => {
  let po = data;
  return po
    .sort(function (a, b) {
      if (a.votes.length < b.votes.length) {
        return order === "asc" ? -1 : 1;
      }
      if (a.votes.length > b.votes.length) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    })
    .slice(0, 5);
};
