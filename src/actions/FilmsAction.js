export const addFilm = (title, director, genre, description, poster) => {
  return {
    type: 'ADD_FILM',
    payload: [title, director, genre, description, poster],
  };
};

export const removeFilm = id => {
  return {
    type: 'REMOVE_FILM',
    payload: id,
  };
};

export const draggingFilm = film => {
  return {
    type: 'DRAGGING_FILM',
    payload: film,
  };
};
export const dropFilm = film => {
  return {
    type: 'DROP_FILM',
    payload: film,
  };
};
export const clickOnFilm = film => {
  return {
    type: 'CLICK_ON_FILM',
    payload: film,
  };
};
export const removeFilmFromMyFilms = id => {
    return {
      type: 'REMOVE_FILM_FROM_MYFILMS',
      payload: id,
    };
  };
export const clearMyFilmsList = () => {
    return {
        type: 'CLEAR_MYFILMS_LIST'
    }
}

