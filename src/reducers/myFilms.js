let myFilmsList = [];
if (
  localStorage.getItem('myFilmsState') === null ||
  localStorage.getItem('myFilmsState').length < 3
) {
  myFilmsList = [];
} else {
  myFilmsList = JSON.parse(localStorage.getItem('myFilmsState'));
}
const initialState = {
  myFilms: myFilmsList,
};

export default function myFilmsReducer(state = initialState, action) {
  switch (action.type) {
    case 'DROP_FILM': {
      const newMyFilms = state.myFilms;
      if (newMyFilms.find(elem => elem.title === action.payload.title) === undefined) {
        newMyFilms.push(action.payload);
        localStorage.setItem('myFilmsState', JSON.stringify(newMyFilms));
      }
      return { ...state, myFilms: newMyFilms };
    }
    case 'REMOVE_FILM_FROM_MYFILMS': {
      const filmsAfterRemove = state.myFilms.filter(elem => elem.key !== action.payload);
      localStorage.setItem('myFilmsState', JSON.stringify(filmsAfterRemove));
      return { ...state, myFilms: filmsAfterRemove };
    }
    case 'CLICK_ON_FILM': {
      return { ...state, clickingFilm: action.payload };
    }
    case 'CLEAR_MYFILMS_LIST': {
      localStorage.removeItem('myFilmsState');
      return { myFilms: [] };
    }
    default:
      return state;
  }
}
