import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as ajaxService from '../../services/ajaxService';

// Initial state
const initialState = Map({
  loading: false,
  searchOpen: false,
  geonodesList: [],
  searchProperties:{
    startStations: null,
    endStation: null,
    sameStations: true,
    startDate: new Date(),
    endDate: new Date()
  }
});

// Actions
const CHANGE_SEARCH_PROPERTIES = 'WelcomeState/CHANGE_SEARCH_PROPERTIES';
const OPEN_SEARCH = 'WelcomeState/OPEN_SEARCH';
const REQUEST_GEONODES = 'WelcomeState/REQUEST_GEONODES';
const RECEIVE_GEONODES = 'WelcomeState/RECEIVE_GEONODES';

// Action creators
export function changeSearchProperties(newProperties) {
  return {
    type: CHANGE_SEARCH_PROPERTIES,
    payload: newProperties
  };
}

export function openSearch() {
  return {type: OPEN_SEARCH};
}

export function requestGeonodes(searchString) {
  return {
    type: REQUEST_GEONODES,
    payload: searchString
  };
}

export function executeSearch() {
  return {
    type: EXECUTE_SEARCH
  };
}

export async function firstSearchResults(){

}

export async function receiveGeonodes() {
  return {
    type: RECEIVE_GEONODES,
    payload: await ajaxService.getGeonodes()
  };
}

// Reducer
export default function ProgressStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_SEARCH_PROPERTIES:
        return state.set('searchProperties',action.payload);

    case OPEN_SEARCH:
        return state.set('searchOpen',true);

    case REQUEST_GEONODES:
        return loop(
          state.set('loading',true),
          Effects.promise(receiveGeonodes,action.payload)
        );

    case RECEIVE_GEONODES:
      return state.set('geonodesList', action.payload);

    default:
      return state;
  }
}
