import React from 'react';
import { connect } from 'react-redux';
import MyFilmsList from '../components/MyFilmsList';
import {
  dropFilm,
  clickOnFilm,
  removeFilmFromMyFilms,
  clearMyFilmsList,
  sortMyFilmsList,
} from '../actions/FilmsAction';

class MyFilmsListContainer extends React.PureComponent {
  render() {
    const { myFilmsList } = this.props.myFilms;
    const {
      draggedFilm,
      dropFilmAction,
      clickOnFilmAction,
      removeFilmFromMyFilmsAction,
      clearMyFilmsListAction,
      sortMyFilmsListAction,
    } = this.props;
    return (
      <MyFilmsList
        myFilmsList={myFilmsList}
        film={draggedFilm}
        dropFilm={dropFilmAction}
        clickOnFilm={clickOnFilmAction}
        removeFilmFromMyFilms={removeFilmFromMyFilmsAction}
        clearMyFilmsList={clearMyFilmsListAction}
        sortMyFilmsList={sortMyFilmsListAction}
      />
    );
  }
}

const mapStateToProps = store => {
  return {
    draggedFilm: store.films.draggedFilm,
    myFilms: store.myFilms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dropFilmAction: film => dispatch(dropFilm(film)),
    clickOnFilmAction: film => dispatch(clickOnFilm(film)),
    removeFilmFromMyFilmsAction: id => dispatch(removeFilmFromMyFilms(id)),
    clearMyFilmsListAction: () => dispatch(clearMyFilmsList()),
    sortMyFilmsListAction: films => dispatch(sortMyFilmsList(films)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFilmsListContainer);
