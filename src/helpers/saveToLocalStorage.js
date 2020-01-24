const saveToLocaleStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export default saveToLocaleStorage;
