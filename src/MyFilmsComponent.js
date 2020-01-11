import React from 'react';

export default class MyFilmsComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {value: []};
      this.onDragOver = this.onDragOver.bind(this);
      this.onDropFilm = this.onDropFilm.bind(this);
      this.removeFilm = this.removeFilm.bind(this);
      this.clickOnFilm = this.clickOnFilm.bind(this);
      this.clearList = this.clearList.bind(this);
      this.sortFilms = this.sortFilms.bind(this);
    }
    onDragOver = (event) => {
      event.preventDefault();
    }
    onDropFilm(event) {
    event.preventDefault();
    if (!this.state.value.map(element => element.title).includes(this.props.film.title)){
     this.state.value.push(this.props.film);
    }
     this.setState(this.state.value);
    }

    removeFilm({ target }) {
      this.setState( {value : this.state.value.filter(elem => elem.title !== target.parentNode.textContent.trim()) });
    }
    clearList() {
      this.setState( {value: [] } )
    }
    sortFilms() {
      this.setState(this.state.value.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      }))
    }
    clickOnFilm({ target }) {
    const [film] = this.state.value.filter(elem => elem.title === target.parentNode.textContent.trim());
    this.props.updateData(film);
    }
    render() {
       let component = null;
       if (this.state.value.length !== 0){
         component = this.state.value.map(elem => <li key = {JSON.stringify(elem.key)} className = "film-item" data-id = {elem.key}>
         <button className = "remove" onClick = {this.removeFilm}> </button>
         <label  className = "title" onClick = {this.clickOnFilm} >{elem.title}</label>
         </li>);
       }
        return (
        <div id = "my-Films">
        <h1>
          Мои фильмы
        </h1>
        <ul onDragOver = {(e) => this.onDragOver(e)} onDrop = {(e) => this.onDropFilm(e)} id = "my-films-list" >
        {component}
        </ul>
        <fieldset id = "buttons" style = {{border:"aliceblue"}}>
          <button id = "clear-my-films" onClick = {this.clearList}>Очистить</button>
          <button id = "sort-my-films" onClick = {this.sortFilms}>Отсортировать по названию</button>
        </fieldset>
      </div>
      );
    }
}