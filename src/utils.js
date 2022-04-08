export const generateRandomString = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const isObject = (object) => object != null && typeof object === "object";

export const objectDeepCompare = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !objectDeepCompare(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
};

export const setLocalStorage = (key, value, append) => {
  let stringValue = value;
  if (typeof value === "object") {
    stringValue = JSON.stringify(value);
    if (append) {
      stringValue = JSON.stringify({
        ...getLocalStorage(key),
        ...value,
      });
    }
  }

  localStorage.setItem(key, stringValue);
};

export const getLocalStorage = (key) => {
  const storageItem = localStorage.getItem(key);
  try {
    return JSON.parse(storageItem);
  } catch (err) {
    return storageItem;
  }
};
