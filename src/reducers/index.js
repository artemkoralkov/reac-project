import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';
import myFilmsReducer from './myFilmsReducer';

const rootReducer = combineReducers({
  films: filmsReducer,
  myFilms: myFilmsReducer,
});
export default rootReducer;
