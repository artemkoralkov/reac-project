import React from 'react';
import { connect } from 'react-redux';

const unirest = require('unirest');
export  class FilmsComponent extends React.Component {
    constructor(props){
        super(props);
        const {films} = this.props.films;
        this.state = {value: films};
        this.removeFilm = this.removeFilm.bind(this);
        this.addFilm = this.addFilm.bind(this);
        this.clickOnFilm = this.clickOnFilm.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
    }

    removeFilm({ target }) {
        this.setState( {value : this.state.value.filter(elem => elem.title !== target.parentNode.textContent.trim()) });
        const [transferFilm] = this.state.value.filter(elem => elem.title === target.textContent.trim());
        

    }
    
    clickOnFilm({ target }) {
      const [film] = this.state.value.filter(elem => elem.title === target.parentNode.textContent.trim());
      this.props.updateData(film);
    }
 
    addFilm(event) {
        event.preventDefault();
        this.inputFilmName = document.getElementById('add-film-Name');
        this.inputFilmDirector = document.getElementById('add-film-Director');
        this.inputFilmGenre = document.getElementById('add-film-Genre');
        this.inputFilmDescription = document.getElementById('add-film-Description');
        this.inputImgSrc = document.getElementById('add-film-poster');
        const newValue = this.state.value;
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
              newValue.push({
                key: newValue.length > 0 ? newValue[newValue.length - 1].key + 1 : 1,
                title: response.body.Title,
                director: response.body.Director,
                genre: response.body.Genre,
                description: response.body.Plot,
                poster: response.body.Poster,
              }
            );
            this.setState({ value: newValue });
            });
            this.inputFilmName.value = '';
          return null;
        }
        if (this.state.value.map(el => el.title).includes(this.inputFilmName.value)){
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
        
        newValue.push({
            key: newValue.length > 0 ? newValue[newValue.length - 1].key + 1 : 1,
            title: this.inputFilmName.value,
            director: this.inputFilmDirector.value,
            genre: this.inputFilmGenre.value,
            description: this.inputFilmDescription.value,
            poster: this.inputImgSrc.value,
          }
        );
        this.setState({ value: newValue });
        this.inputFilmName.value = '';
        this.inputFilmDirector.value = '';
        this.inputFilmGenre.value = '';
        this.inputFilmDescription.value = '';
        this.inputImgSrc.value = '';

    }
    onDragStart(event){
      // event.preventDefault();
      const [transferFilm] = this.state.value.filter(elem => elem.title === event.target.textContent.trim());
      this.props.dropFilm(transferFilm);
      event.dataTransfer.setData('Object', transferFilm);
      

    }
    render() {
    const items = this.state.value.map(elem => <li key = {JSON.stringify(elem.key)} className = "film-item" data-id = {elem.key}>
    <button className = "remove" onClick = {this.removeFilm}> </button>
    <label  className = "title" draggable = "true" onClick = {this.clickOnFilm} onDrag = {(e) => this.onDragStart(e)}>{elem.title}</label>
    </li>);
        return (
<div id="films">
      <h1> Фильмы </h1>
        <ul id = "films-list">
          {items}
        </ul>
        <form id = "films-Lib">
          <fieldset>
            <legend>Добавить фильм</legend>
            <p>Название:<br/><input id="add-film-Name" type="text"></input></p>
            <p>Режиссёр:<br/><input id="add-film-Director" type="text"></input></p>
            <p>Жанр:<br/><input id="add-film-Genre" type="text"></input></p>
            <p>Описание:<br/><input id="add-film-Description" type="text"></input></p>
            <p>Ссылка на постер:<br/><input id="add-film-poster" type="text"></input></p>
            <button id="add-button" type="submit" onClick = {this.addFilm}>Добавить</button>
          </fieldset>
        </form>
    </div>
        );
    }
}
const mapStateToProps = store => {
  // console.log(store);
  return {
    films: store.films
  }
}
const mapDispatchToProps = dispatch => ({
   addFilmAction: (title, director, genre, description, poster) => dispatch(addFilm(title, director, genre, description, poster)),
  })

export default connect(mapStateToProps, mapDispatchToProps)(FilmsComponent)