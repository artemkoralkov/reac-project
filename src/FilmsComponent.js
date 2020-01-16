import React from 'react';

const unirest = require('unirest');
const image = require('./images/img-not-found.png');

const regURL = /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=~/-]*)?(?:#[^ '"&<>]*)?$/i;

export default class FilmsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.removeFilm = this.removeFilm.bind(this);
    this.addFilm = this.addFilm.bind(this);
    this.clickOnFilm = this.clickOnFilm.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
  }

  removeFilm({ target }) {
    const id = +target.parentNode.getAttribute('data-id');
    this.props.removeFilm(id);
  }

  clickOnFilm({ target }) {
    const [film] = this.props.films.films.filter(
      elem => elem.title === target.parentNode.textContent.trim()
    );
    this.props.clickOnFilm(film);
  }

  addFilm(event) {
    event.preventDefault();
    this.inputFilmName = document.getElementById('add-film-Name');
    this.inputFilmDirector = document.getElementById('add-film-Director');
    this.inputFilmGenre = document.getElementById('add-film-Genre');
    this.inputFilmDescription = document.getElementById('add-film-Description');
    this.inputImgSrc = document.getElementById('add-film-poster');
    if (this.props.films.films.map(el => el.title).includes(this.inputFilmName.value)) {
      this.inputFilmName.value = 'Фильм уже есть в списке';
      this.inputFilmDirector.value = '';
      this.inputFilmGenre.value = '';
      this.inputFilmDescription.value = '';
      this.inputImgSrc.value = '';
      return null;
    }
    if (
      this.inputFilmGenre.value === '' &&
      this.inputFilmDirector.value === '' &&
      this.inputFilmDescription.value === '' &&
      this.inputImgSrc.value === '' &&
      this.inputFilmName.value !== ''
    ) {
      unirest
        .get(`http://www.omdbapi.com/?t=${this.inputFilmName.value}&apikey=4085b160`)
        .end(response => {
          if (response.body.Response === 'False') {
            this.inputFilmName.value = `${response.body.Error}, введите название на английском`;
          } else if (this.props.films.films.map(el => el.title).includes(response.body.Title)) {
            this.inputFilmName.value = 'Фильм уже есть в списке';
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
      this.inputFilmName.value = '';
      return null;
    }

    if (this.inputFilmName.value === '' || this.inputFilmName.value === 'Фильм уже есть в списке') {
      return null;
    }
    if (this.inputFilmDirector.value === '') {
      return null;
    }
    if (this.inputFilmGenre.value === '') {
      return null;
    }
    if (this.inputFilmDescription.value === '') {
      return null;
    }
    if (this.inputImgSrc.value === '' || !this.inputImgSrc.value.match(regURL)) {
      this.props.addFilm(
        this.inputFilmName.value,
        this.inputFilmDirector.value,
        this.inputFilmGenre.value,
        this.inputFilmDescription.value,
        image
      );
      this.inputFilmName.value = '';
      this.inputFilmDirector.value = '';
      this.inputFilmGenre.value = '';
      this.inputFilmDescription.value = '';
      this.inputImgSrc.value = '';
      return null;
    }
    this.props.addFilm(
      this.inputFilmName.value,
      this.inputFilmDirector.value,
      this.inputFilmGenre.value,
      this.inputFilmDescription.value,
      this.inputImgSrc.value
    );
    this.inputFilmName.value = '';
    this.inputFilmDirector.value = '';
    this.inputFilmGenre.value = '';
    this.inputFilmDescription.value = '';
    this.inputImgSrc.value = '';
    return null;
  }

  onDragStart(event) {
    const [transferFilm] = this.props.films.films.filter(
      elem => elem.title === event.target.textContent.trim()
    );
    this.props.draggingFilm(transferFilm);
    event.dataTransfer.setData('Object', transferFilm);
  }

  render() {
    const items = this.props.films.films.map(elem => (
      <li key={JSON.stringify(elem.key)} className="film-item" data-id={elem.key}>
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
              <input id="add-film-Name" type="text"></input>
            </p>
            <p>
              Режиссёр:
              <br />
              <input id="add-film-Director" type="text"></input>
            </p>
            <p>
              Жанр:
              <br />
              <input id="add-film-Genre" type="text"></input>
            </p>
            <p>
              Описание:
              <br />
              <input id="add-film-Description" type="text"></input>
            </p>
            <p>
              Ссылка на постер:
              <br />
              <input id="add-film-poster" type="text"></input>
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
