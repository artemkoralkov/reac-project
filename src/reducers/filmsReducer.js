import startFilmsArray from '../helpers/startFilmsArray';
import loadFromLocalStorage from '../helpers/loadFromLocalStorage';
import saveToLocalStorage from '../helpers/saveToLocalStorage';

let filmsList = [];
if (
  loadFromLocalStorage('filmsState') === null ||
  loadFromLocalStorage('filmsState').length === 0
) {
  filmsList = startFilmsArray;
  saveToLocalStorage('filmsState', filmsList);
} else {
  filmsList = loadFromLocalStorage('filmsState');
}

const initialState = {
  filmsList,
  draggedFilm: {},
  clickedFilm: {},
};
export default function filmsReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FILM_TO_FILMS': {
      return { ...state, filmsList: action.payload };
    }
    case 'REMOVE_FILM_FROM_FILMS': {
      return { ...state, filmsList: action.payload };
    }
    case 'DRAG_FILM_FROM_FILMS': {
      return { ...state, draggedFilm: action.payload };
    }
    case 'CLICK_ON_FILM': {
      return { ...state, clickedFilm: action.payload };
    }
    default:
      return state;
  }
}
