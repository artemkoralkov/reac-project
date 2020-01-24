import loadFromLocalStorage from '../helpers/loadFromLocalStorage';

let myFilmsList;
if (
  loadFromLocalStorage('myFilmsState') === null ||
  loadFromLocalStorage('myFilmsState').length === 0
) {
  myFilmsList = [];
} else {
  myFilmsList = loadFromLocalStorage('myFilmsState');
}
const initialState = {
  myFilmsList,
};

export default function myFilmsReducer(state = initialState, action) {
  switch (action.type) {
    case 'DROP_FILM_TO_MY_FILMS': {
      return { ...state, myFilmsList: action.payload };
    }
    case 'REMOVE_FILM_FROM_MY_FILMS': {
      return { ...state, myFilmsList: action.payload };
    }
    case 'CLICK_ON_FILM': {
      return { ...state, clickedFilm: action.payload };
    }
    case 'CLEAR_MY_FILMS_LIST': {
      return { ...state, myFilmsList: [] };
    }
    case 'SORT_MY_FILMS_LIST': {
      return { ...state, myFilmsList: action.payload };
    }
    default:
      return state;
  }
}
