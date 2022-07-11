export function isValidDataObject(dataObject) {
  const validKeys = ["text"];
  console.log(dataObject);
  console.log(Object.keys(dataObject));
  if (
    typeof dataObject === "object" &&
    !Array.isArray(dataObject) &&
    dataObject !== null &&
    Object.keys(dataObject).every((key) => validKeys.includes(key))
  ) {
    return true;
  }
  return false;
}

export function isValidData(data) {
  if (
    Array.isArray(data) &&
    data.every((dataObject) => isValidDataObject(dataObject))
  ) {
    return true;
  }

  return false;
}

export default [
  {
    text: "JS 공부하기",
  },
  {
    text: "JS 복습하기",
  },
];
