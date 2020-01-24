import React from 'react';
import PropTypes from 'prop-types';
import unirest from 'unirest';
import image from '../images/img-not-found.png';

const regURL = /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=~/-]*)?(?:#[^ '"&<>]*)?$/i;

export default class FilmsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmName: '',
      filmDirector: '',
      filmGenre: '',
      filmDescription: '',
      filmPoster: '',
    };
    this.removeFilm = this.removeFilm.bind(this);
    this.addFilm = this.addFilm.bind(this);
    this.clickOnFilm = this.clickOnFilm.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onChangeFilmName = this.onChangeFilmName.bind(this);
    this.onChangeFilmDirector = this.onChangeFilmDirector.bind(this);
    this.onChangeFilmGenre = this.onChangeFilmGenre.bind(this);
    this.onChangeFilmDescription = this.onChangeFilmDescription.bind(this);
    this.onChangeFilmPoster = this.onChangeFilmPoster.bind(this);
  }

  onChangeFilmName(event) {
    this.setState({ filmName: event.target.value });
  }

  onChangeFilmDirector(event) {
    this.setState({ filmDirector: event.target.value });
  }

  onChangeFilmGenre(event) {
    this.setState({ filmGenre: event.target.value });
  }

  onChangeFilmDescription(event) {
    this.setState({ filmDescription: event.target.value });
  }

  onChangeFilmPoster(event) {
    this.setState({ filmPoster: event.target.value });
  }

  removeFilm({ target }) {
    const id = +target.parentNode.getAttribute('data-id');
    this.props.removeFilmFromFilms(id);
    this.props.removeFilmFromMyFilms(id);
  }

  clickOnFilm({ target }) {
    const [film] = this.props.filmsList.filter(
      elem => elem.title === target.parentNode.textContent.trim()
    );
    this.props.clickOnFilm(film);
  }

  addFilm(event) {
    event.preventDefault();
    if (this.props.filmsList.map(el => el.title).includes(this.state.filmName)) {
      this.setState({
        filmName: 'Фильм уже есть в списке',
        filmDirector: '',
        filmGenre: '',
        filmDescription: '',
        filmPoster: '',
      });
      return null;
    }

    if (
      this.state.filmName !== '' &&
      this.state.filmDirector === '' &&
      this.state.filmGenre === '' &&
      this.state.filmDescription === '' &&
      this.state.filmPoster === ''
    ) {
      unirest
        .get(`http://www.omdbapi.com/?t=${this.state.filmName}&apikey=4085b160`)
        .end(response => {
          if (response.body.Response === 'False') {
            this.setState({ filmName: `${response.body.Error}, введите название на английском` });
            return null;
          }
          if (this.props.filmsList.map(el => el.title).includes(response.body.Title)) {
            this.setState({ filmName: 'Фильм уже есть в списке' });
            return null;
          }
          this.props.addFilm(
            response.body.Title,
            response.body.Director,
            response.body.Genre,
            response.body.Plot,
            response.body.Poster
          );
          return null;
        });
      this.setState({ filmName: '' });
      return null;
    }

    if (
      this.state.filmName === '' ||
      this.state.filmName === 'Фильм уже есть в списке' ||
      this.state.filmDirector === '' ||
      this.state.filmGenre === '' ||
      this.state.filmDescription === ''
    ) {
      return null;
    }

    if (this.state.filmPoster === '' || !this.state.filmPoster.match(regURL)) {
      this.props.addFilm(
        this.state.filmName,
        this.state.filmDirector,
        this.state.filmGenre,
        this.state.filmDescription,
        image
      );
      this.setState({
        filmName: '',
        filmDirector: '',
        filmGenre: '',
        filmDescription: '',
        filmPoster: '',
      });
      return null;
    }
    this.props.addFilm(
      this.state.filmName,
      this.state.filmDirector,
      this.state.filmGenre,
      this.state.filmDescription,
      this.state.filmPoster
    );
    this.setState({
      filmName: '',
      filmDirector: '',
      filmGenre: '',
      filmDescription: '',
      filmPoster: '',
    });
    return null;
  }

  onDragStart(event) {
    const [transferFilm] = this.props.filmsList.filter(
      elem => elem.title === event.target.textContent.trim()
    );
    this.props.dragFilm(transferFilm);
    event.dataTransfer.setData('Object', transferFilm);
  }

  render() {
    const items = this.props.filmsList.map(elem => (
      <li key={JSON.stringify(elem.id)} className="film-item" data-id={elem.id}>
        <button className="remove" onClick={this.removeFilm}></button>
        <label
          className="title"
          draggable="true"
          onClick={this.clickOnFilm}
          onDragStart={e => this.onDragStart(e)}
        >
          {elem.title}
        </label>
      </li>
    ));
    return (
      <div id="films">
        <h1> Фильмы </h1>
        <ul id="films-list">{items}</ul>
        <form id="films-Lib">
          <fieldset>
            <legend>Добавить фильм</legend>
            <p>
              Название:
              <br />
              <input
                id="add-film-Name"
                type="text"
                value={this.state.filmName}
                onChange={this.onChangeFilmName}
              ></input>
            </p>
            <p>
              Режиссёр:
              <br />
              <input
                id="add-film-Director"
                type="text"
                value={this.state.filmDirector}
                onChange={this.onChangeFilmDirector}
              ></input>
            </p>
            <p>
              Жанр:
              <br />
              <input
                id="add-film-Genre"
                type="text"
                value={this.state.filmGenre}
                onChange={this.onChangeFilmGenre}
              ></input>
            </p>
            <p>
              Описание:
              <br />
              <input
                id="add-film-Description"
                type="text"
                value={this.state.filmDescription}
                onChange={this.onChangeFilmDescription}
              ></input>
            </p>
            <p>
              Ссылка на постер:
              <br />
              <input
                id="add-film-poster"
                type="text"
                value={this.state.filmPoster}
                onChange={this.onChangeFilmPoster}
              ></input>
            </p>
            <button id="add-button" type="submit" onClick={this.addFilm}>
              Добавить
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

FilmsList.propTypes = {
  filmsList: PropTypes.array,
  draggedFilm: PropTypes.object,
  clickedFilm: PropTypes.object,
  dragFilm: PropTypes.func,
  removeFilm: PropTypes.func,
  removeMyFilm: PropTypes.func,
  addFilm: PropTypes.func,
  clickOnFilm: PropTypes.func,
};
