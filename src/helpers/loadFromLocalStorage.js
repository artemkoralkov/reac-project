const loadFromLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

export default loadFromLocalStorage;
