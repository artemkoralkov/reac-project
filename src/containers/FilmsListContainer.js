import React from 'react';
import { connect } from 'react-redux';
import FilmsList from '../components/FilmsList';
import {
  addFilm,
  removeFilmFromFilms,
  dragFilm,
  clickOnFilm,
  removeFilmFromMyFilms,
} from '../actions/FilmsAction';

class FilmsListContainer extends React.PureComponent {
  render() {
    const { filmsList } = this.props.films;
    const {
      addFilmAction,
      removeFilmFromFilmsAction,
      dragFilmAction,
      clickOnFilmAction,
      removeFilmFromMyFilmsAction,
    } = this.props;
    return (
      <FilmsList
        filmsList={filmsList}
        dragFilm={dragFilmAction}
        removeFilmFromFilms={removeFilmFromFilmsAction}
        removeFilmFromMyFilms={removeFilmFromMyFilmsAction}
        addFilm={addFilmAction}
        clickOnFilm={clickOnFilmAction}
      />
    );
  }
}

const mapStateToProps = store => {
  return {
    films: store.films,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFilmAction: (title, director, genre, description, poster) =>
      dispatch(addFilm(title, director, genre, description, poster)),
    removeFilmFromFilmsAction: id => dispatch(removeFilmFromFilms(id)),
    dragFilmAction: film => dispatch(dragFilm(film)),
    clickOnFilmAction: film => dispatch(clickOnFilm(film)),
    removeFilmFromMyFilmsAction: id => dispatch(removeFilmFromMyFilms(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmsListContainer);
