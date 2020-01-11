import React from 'react';
// import logo from './logo.svg';
import './MyFilmsComponent.js'
import './App.css';
import MyFilmsComponent from './MyFilmsComponent.js';
import FilmsInformationComponent from './FilmsInformationComponent.js'
import FilmsComponent from './FilmsComponent.js'

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
    <FilmsComponent dropFilm = {this.dropFilm} /* value = {this.state.value} */ updateData={this.updateData}/>
    {component}
    {dropComponent}
    </main>
    </>
  );
}
}

export default App;
