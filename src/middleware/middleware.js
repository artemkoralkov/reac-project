import saveToLocalStorage from '../helpers/saveToLocalStorage';

export default function middleware(store) {
  return function(next) {
    return function(action) {
      if (action.type === 'REMOVE_FILM_FROM_FILMS') {
        /*   const filmsAfterRemove = store
          .getState()
          .films.filmsList.filter(elem => elem.id !== action.payload);
        localStorage.setItem('filmsState', JSON.stringify(filmsAfterRemove));
        action.payload = filmsAfterRemove; */
        saveToLocalStorage('filmsState', action.payload);
      }
      if (action.type === 'ADD_FILM_TO_FILMS') {
        /* const id =
          store.getState().films.filmsList[store.getState().films.filmsList.length - 1].id + 1;
        const newFilms = store.getState().films.filmsList;
        newFilms.push({
          id,
          title: action.payload[0],
          director: action.payload[1],
          genre: action.payload[2],
          description: action.payload[3],
          poster: action.payload[4],
        });
        localStorage.setItem('filmsState', JSON.stringify(newFilms));
        action.payload = newFilms; */
        saveToLocalStorage('filmsState', action.payload);
      }

      if (action.type === 'DROP_FILM_TO_MY_FILMS') {
        /* const newMyFilms = store.getState().myFilms.myFilmsList;
        if (newMyFilms.find(elem => elem.title === action.payload.title) === undefined) {
          newMyFilms.push(action.payload);
          localStorage.setItem('myFilmsState', JSON.stringify(newMyFilms));
        }
        action.payload = newMyFilms; */
        saveToLocalStorage('myFilmsState', action.payload);
      }

      if (action.type === 'REMOVE_FILM_FROM_MY_FILMS') {
        /*  const filmsAfterRemove = store
          .getState()
          .myFilms.myFilmsList.filter(elem => elem.id !== action.payload);
        localStorage.setItem('myFilmsState', JSON.stringify(filmsAfterRemove));
        action.payload = filmsAfterRemove; */
        saveToLocalStorage('myFilmsState', action.payload);
      }

      if (action.type === 'CLEAR_MY_FILMS_LIST') {
        saveToLocalStorage('myFilmsState', []);
      }

      if (action.type === 'SORT_MY_FILMS_LIST') {
        /*  const sortedMyFilms = store.getState().myFilms.myFilmsList;
        action.payload = sortedMyFilms.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
        action.payload = sortedMyFilms;
         */
      }
      return next(action);
    };
  };
}
