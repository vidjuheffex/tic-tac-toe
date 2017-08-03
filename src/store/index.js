import {combineReducers, createStore} from 'redux';
import markerReducers from '../reducers/markerReducers';

let reducers = combineReducers({
  markers: markerReducers
});

let store = createStore(reducers);

export default store;
