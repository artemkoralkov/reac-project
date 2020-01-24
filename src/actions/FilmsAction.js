import loadFromLocalStorage from '../helpers/loadFromLocalStorage';

export const addFilm = (title, director, genre, description, poster) => {
  const id =
    loadFromLocalStorage('filmsState')[loadFromLocalStorage('filmsState').length - 1].id + 1;
  const newFilms = loadFromLocalStorage('filmsState');
  newFilms.push({
    id,
    title,
    director,
    genre,
    description,
    poster,
  });
  return {
    type: 'ADD_FILM_TO_FILMS',
    payload: newFilms,
  };
};

export const removeFilmFromFilms = id => {
  const filmsAfterRemove = loadFromLocalStorage('filmsState').filter(elem => elem.id !== id);
  return {
    type: 'REMOVE_FILM_FROM_FILMS',
    payload: filmsAfterRemove,
  };
};

export const dragFilm = film => {
  return {
    type: 'DRAG_FILM_FROM_FILMS',
    payload: film,
  };
};

export const dropFilm = film => {
  const newMyFilms = loadFromLocalStorage('myFilmsState');
  if (newMyFilms.find(elem => elem.title === film.title) === undefined) {
    newMyFilms.push(film);
  }
  return {
    type: 'DROP_FILM_TO_MY_FILMS',
    payload: newMyFilms,
  };
};

export const clickOnFilm = film => {
  return {
    type: 'CLICK_ON_FILM',
    payload: film,
  };
};

export const removeFilmFromMyFilms = id => {
  const myFilmsAfterRemove = loadFromLocalStorage('myFilmsState').filter(elem => elem.id !== id);
  return {
    type: 'REMOVE_FILM_FROM_MY_FILMS',
    payload: myFilmsAfterRemove,
  };
};

export const clearMyFilmsList = () => {
  return {
    type: 'CLEAR_MY_FILMS_LIST',
  };
};

export const sortMyFilmsList = films => {
  const sortedMyFilms = films;
  sortedMyFilms.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  });

  return {
    type: 'SORT_MY_FILMS_LIST',
    payload: sortedMyFilms,
  };
};
