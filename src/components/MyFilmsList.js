import React from 'react';
import PropTypes from 'prop-types';

export default class MyFilmsList extends React.Component {
  constructor(props) {
    super(props);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDropFilm = this.onDropFilm.bind(this);
    this.removeFilm = this.removeFilm.bind(this);
    this.clickOnFilm = this.clickOnFilm.bind(this);
    this.clearList = this.clearList.bind(this);
    this.sortFilms = this.sortFilms.bind(this);
  }

  onDragOver(event) {
    event.preventDefault();
    const dragOverLabel = event.target;
    dragOverLabel.style.opacity = 0.5;
    return this;
  }

  onDragLeave(event) {
    event.preventDefault();
    const dragLeaveLabel = event.target;
    dragLeaveLabel.style.opacity = 1;
    return this;
  }

  onDropFilm(event) {
    event.preventDefault();
    const dropFilmLabel = event.target;
    dropFilmLabel.style.opacity = 1;
    this.props.dropFilm(this.props.film);
  }

  removeFilm({ target }) {
    const id = +target.parentNode.getAttribute('data-id');
    this.props.removeFilmFromMyFilms(id);
  }

  clearList() {
    this.props.clearMyFilmsList();
  }

  sortFilms() {
    this.props.sortMyFilmsList(this.props.myFilmsList);
  }

  clickOnFilm({ target }) {
    const [film] = this.props.myFilmsList.filter(
      elem => elem.title === target.parentNode.textContent.trim()
    );

    this.props.clickOnFilm(film);
  }

  render() {
    let component = null;

    if (this.props.myFilmsList.length !== 0) {
      component = this.props.myFilmsList.map(elem => (
        <li key={JSON.stringify(elem.id)} className="film-item" data-id={elem.id}>
          <button className="remove" onClick={this.removeFilm}></button>
          <label className="title" onClick={this.clickOnFilm}>
            {elem.title}
          </label>
        </li>
      ));
    }
    return (
      <div id="my-Films">
        <h1>Мои фильмы</h1>
        <ul
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDropFilm}
          id="my-films-list"
        >
          {component}
        </ul>
        <fieldset id="buttons" style={{ border: 'aliceblue' }}>
          <button id="clear-my-films" onClick={this.clearList}>
            Очистить
          </button>
          <button id="sort-my-films" onClick={this.sortFilms}>
            Отсортировать по названию
          </button>
        </fieldset>
      </div>
    );
  }
}

MyFilmsList.propTypes = {
  myFilmsList: PropTypes.array,
  film: PropTypes.object,
  dropFilm: PropTypes.func,
  clickOnFilm: PropTypes.func,
  removeFilmFromMyFilms: PropTypes.func,
  clearMyFilmsList: PropTypes.func,
  sortMyFilmsList: PropTypes.func,
};
