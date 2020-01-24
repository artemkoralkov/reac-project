import React from 'react';

export default class FilmsInformation extends React.PureComponent {
  render() {
    return (
      <div className="films-Informaion" id="films-info">
        <>
          <h1>Информация о фильме</h1>
          <p style={{ textAlign: 'center' }}>
            <b>Постер</b>
          </p>
          <p id="film-poster" style={{ textAlign: 'center' }}>
            <img height="230px" alt="" src={this.props.clickedFilm.poster || undefined}></img>
          </p>
          <ul id="film-info-list">
            <li id="film-name">
              <b>Название</b>:{this.props.clickedFilm.title}
            </li>
            <li id="film-director">
              <b>Режиссёр</b>:{this.props.clickedFilm.director}
            </li>
            <li id="film-genre">
              <b>Жанр</b>:{this.props.clickedFilm.genre}
            </li>
          </ul>
          <p style={{ textAlign: 'center' }}>
            <b>Описание</b>:
          </p>
          <fieldset style={{ overflow: 'auto', height: '100px' }}>
            <p id="film-description">{this.props.clickedFilm.description}</p>
          </fieldset>
        </>
      </div>
    );
  }
}
