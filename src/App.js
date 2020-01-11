import React from 'react';
// import logo from './logo.svg';
import './MyFilmsComponent.js'
import './App.css';
import { connect } from 'react-redux'
import MyFilmsComponent from './MyFilmsComponent.js';
import FilmsInformationComponent from './FilmsInformationComponent.js'
import FilmsComponent from './FilmsComponent.js'
import {addFilm, removeFilm} from './actions/FilmsAction'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    clickElement: '',
    transferFilm: '',}
  }
  updateData = (value) =>
  {
    this.setState({ clickElement: value})
  }
  dropFilm = (value) =>
  {
    this.setState({transferFilm: value})
  }
  render() {
    let component = null;
    if (this.state.clickElement !== ''){
      component = <FilmsInformationComponent film = {this.state.clickElement}/>;
    } else {
      component = <FilmsInformationComponent/>;
    }
    let dropComponent = null;
    if (this.state.transferFilm !== ''){
      dropComponent = <MyFilmsComponent updateData={this.updateData} film = {this.state.transferFilm}/>;
    } else {
      dropComponent = <MyFilmsComponent/>;
    }
  return (
    <>
    <h1 style={{color: "aliceblue", fontSize: "40px"}}>
  	Фильмотека
    </h1>
    <main id = "app">
    <FilmsComponent removeFilm = {this.props.removeFilmAction} addFilm = {this.props.addFilmAction} dropFilm = {this.dropFilm} films={this.props.films} updateData={this.updateData}/>
    {component}
    {dropComponent}
    </main>
    </>
  );
}
}
const mapStateToProps = store => {
  // console.log(store);
  return {
    films: store.films
  }
}
const mapDispatchToProps = dispatch => {
  return{
    removeFilmAction: (id) => dispatch(removeFilm(id)),
    addFilmAction: (title, director, genre, description, poster) => dispatch(addFilm(title, director, genre, description, poster)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

