import React from 'react';
import './App.css';
import MyFilmsListContainer from '../containers/MyFilmsListContainer';
import FilmsInformationContainer from '../containers/FilmsInformationContainer';
import FilmsListContainer from '../containers/FilmsListContainer';

export default class App extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <>
        <h1 style={{ color: 'aliceblue', fontSize: '40px' }}>Фильмотека</h1>
        <main id="app">
          <FilmsListContainer />
          <FilmsInformationContainer />
          <MyFilmsListContainer />
        </main>
      </>
    );
  }
}
