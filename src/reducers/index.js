import { combineReducers } from 'redux';
import { filmsReducer } from './films';
import { myFilmsReducer } from './myFilms';

export const rootReducer = combineReducers({
  films: filmsReducer,
  myFilms: myFilmsReducer,
});
