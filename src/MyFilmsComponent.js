import React from 'react';

export default class MyFilmsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.myFilms };
    this.onDragOver = this.onDragOver.bind(this);
    this.onDropFilm = this.onDropFilm.bind(this);
    this.removeFilm = this.removeFilm.bind(this);
    this.clickOnFilm = this.clickOnFilm.bind(this);
    this.clearList = this.clearList.bind(this);
    this.sortFilms = this.sortFilms.bind(this);
  }

  onDragOver = event => {
    event.preventDefault();
  };

  onDropFilm(event) {
    event.preventDefault();
    if (this.props.myfilms === undefined) {
      this.props.dropFilm(this.props.film);
      return;
    }
    if (!this.props.myfilms.map(element => element.title).includes(this.props.film.title)) {
      return;
    }

    this.props.dropFilm(this.props.film);
  }

  removeFilm({ target }) {
    const id = +target.parentNode.getAttribute('data-id');
    this.props.removeFilm(id);
  }

  clearList() {
    this.props.clearMyFilmsList();
  }

  sortFilms() {
    this.setState(
      this.props.myFilms.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      })
    );
  }

  clickOnFilm({ target }) {
    const [film] = this.props.myFilms.filter(
      elem => elem.title === target.parentNode.textContent.trim()
    );
    this.props.clickOnFilm(film);
  }

  render() {
    let component = null;
    if (this.props.myFilms.length !== 0) {
      component = this.props.myFilms.map(elem => (
        <li key={JSON.stringify(elem.key)} className="film-item" data-id={elem.key}>
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
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDropFilm(e)}
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
