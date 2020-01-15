import React from 'react';

const unirest = require('unirest');

export default class FilmsComponent extends React.Component {
  constructor(props) {
    super(props);
    // const {films} = this.props.films;
    //console.log(this.props);
    // console.log(films);
    // this.state = {value: films};
    this.removeFilm = this.removeFilm.bind(this);
    this.addFilm = this.addFilm.bind(this);
    this.clickOnFilm = this.clickOnFilm.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    // console.log(this.props.removeFilm);
  }

  removeFilm({ target }) {
    // alert(JSON.stringify(this.props.films))
    const id = +target.parentNode.getAttribute('data-id');
    // будет удалять из списка если раскомментить эту строкуthis.setState( {value : this.state.value.filter(elem => elem.title !== target.parentNode.textContent.trim()) });
    // const [transferFilm] = this.state.value.filter(elem => elem.title === target.textContent.trim());
    this.props.removeFilm(id);
  }

  clickOnFilm({ target }) {
     const [film] = this.props.films.films.filter(
      elem => elem.title === target.parentNode.textContent.trim()
    );
    //console.log(film);
    this.props.clickOnFilm(film);
    // alert(typeof target.parentNode.getAttribute('data-id'))
  }

  addFilm(event) {
    event.preventDefault();
    // const {films} = this.props.films;
    this.inputFilmName = document.getElementById('add-film-Name');
    this.inputFilmDirector = document.getElementById('add-film-Director');
    this.inputFilmGenre = document.getElementById('add-film-Genre');
    this.inputFilmDescription = document.getElementById('add-film-Description');
    this.inputImgSrc = document.getElementById('add-film-poster');
    // const newValue = this.state.value;
    // const {films} = this.props.films;
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
          } else
            this.props.addFilm(
              response.body.Title,
              response.body.Director,
              response.body.Genre,
              response.body.Plot,
              response.body.Poster
            );
          /*   newValue.push({
                key: newValue.length > 0 ? newValue[newValue.length - 1].key + 1 : 1,
                title: response.body.Title,
                director: response.body.Director,
                genre: response.body.Genre,
                description: response.body.Plot,
                poster: response.body.Poster,
              } 
            ); */
          // this.setState({ value: newValue });
        });
      this.inputFilmName.value = '';
      return null;
    }
    if (this.props.films.films.map(el => el.title).includes(this.inputFilmName.value)) {
      this.inputFilmName.value = 'Фильм уже есть в списке';
      this.inputFilmDirector.value = '';
      this.inputFilmGenre.value = '';
      this.inputFilmDescription.value = '';
      this.inputImgSrc.value = '';
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
    this.props.addFilm(
      this.inputFilmName.value,
      this.inputFilmDirector.value,
      this.inputFilmGenre.value,
      this.inputFilmDescription.value,
      this.inputImgSrc.value
    );
    /* newValue.push({
            key: newValue.length > 0 ? newValue[newValue.length - 1].key + 1 : 1,
            title: this.inputFilmName.value,
            director: this.inputFilmDirector.value,
            genre: this.inputFilmGenre.value,
            description: this.inputFilmDescription.value,
            poster: this.inputImgSrc.value,
          }
        ); */
    // this.setState({ value: newValue });
    this.inputFilmName.value = '';
    this.inputFilmDirector.value = '';
    this.inputFilmGenre.value = '';
    this.inputFilmDescription.value = '';
    this.inputImgSrc.value = '';
  }

  onDragStart(event) {
    // event.preventDefault();
    const [transferFilm] = this.props.films.films.filter(
      elem => elem.title === event.target.textContent.trim()
    );
    // console.log(transferFilm);
    // this.props.dropFilm(transferFilm);
    this.props.draggingFilm(transferFilm);
    event.dataTransfer.setData('Object', transferFilm);
  }

  render() {
    // const {films} = this.props.films;
    const items = this.props.films.films.map(elem => (
      <li key={JSON.stringify(elem.key)} className="film-item" data-id={elem.key}>
        <button className="remove" onClick={this.removeFilm}>
          {' '}
        </button>
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
