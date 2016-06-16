import {Map} from 'immutable';
import {combineReducers} from 'redux-loop';
import NavigationStateReducer from '../modules/navigation/NavigationState';
import SearchStateReducer from '../modules/search/SearchState';
import ProgressStateReducer from '../modules/progress/ProgressState';
import StationsStateReducer from '../modules/stations/StationsState';

const reducers = {
  search: SearchStateReducer,
  progress: ProgressStateReducer,
  stations: StationsStateReducer,
  navigationState: NavigationStateReducer,
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  return namespacedReducer(state || void 0, action);
}
