import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as ajaxService from '../../services/ajaxService';

// Initial state
const initialState = Map({
  loading: false,
  searchOpen: false,
  geonodesList: [],
  startStation: null,
  endStation: null,
  differentStations: false,
  startDate: new Date(),
  endDate: new Date(),
  currentPicker: null
});

// Actions
const CHANGE_SEARCH_PROPERTIES = 'SearchState/CHANGE_SEARCH_PROPERTIES';
const OPEN_SEARCH = 'SearchState/OPEN_SEARCH';
const REQUEST_GEONODES = 'SearchState/REQUEST_GEONODES';
const RECEIVE_GEONODES = 'SearchState/RECEIVE_GEONODES';
const CHANGE_SAME_STATION = 'SearchState/CHANGE_SAME_STATION';
const CHANGE_START_DATE = 'SearchState/CHANGE_START_DATE';
const CHANGE_END_DATE = 'SearchState/CHANGE_END_DATE';
const CHANGE_START_STATION = 'SearchState/CHANGE_START_STATION';
const CHANGE_END_STATION = 'SearchState/CHANGE_END_STATION';
const SET_CURRENT_PICKER = 'SearchState/SET_CURRENT_PICKER';

// Action creators
export function setCurrentPicker(picker){
  return {
    type: SET_CURRENT_PICKER,
    payload:picker //{format:'date or station',type:'start or end' }
  }
}
export function setStartStation(station){
  return{
    type:CHANGE_START_STATION,
    payload: station
  }
}

export function setEndStation(station){
  return{
    type:CHANGE_END_STATION,
    payload: station
  }
}

export function setStartDate(date){
  return{
    type:CHANGE_START_DATE,
    payload: date
  }
}

export function setEndDate(date){
  return{
    type:CHANGE_END_DATE,
    payload: date
  }
}

export function changeSearchProperties(newProperties) {
  return {
    type: CHANGE_SEARCH_PROPERTIES,
    payload: newProperties
  };
}

export function changeSameStation(value){
  return{
    type: CHANGE_SAME_STATION,
    payload: value
  }
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

export async function receiveGeonodes(searchstring) {
  return {
    type: RECEIVE_GEONODES,
    payload: await ajaxService.getGeonodes(searchstring)
  };
}

// Reducer
export default function SearchStateReducer(state = initialState, action = {}) {

  switch (action.type) {
    case SET_CURRENT_PICKER:
        return state.set('currentPicker',action.payload)

    case CHANGE_START_DATE:
        return state.set('startDate',action.payload);

    case CHANGE_END_DATE:
        return state.set('endDate',action.payload);

    case CHANGE_START_STATION:
        return state.set('startStation',action.payload);

    case CHANGE_END_STATION:
        return state.set('endStation',action.payload);

    case CHANGE_SAME_STATION:
        return state.set('differentStations',action.payload);

    case CHANGE_SEARCH_PROPERTIES:
        return state.set('searchProperties',action.payload);

    case OPEN_SEARCH:
        return state.set('searchOpen',!state.get('searchOpen'));

    case REQUEST_GEONODES:
        return loop(
          state.set('loading',true),
          Effects.promise(receiveGeonodes, action.payload)
        );

    case RECEIVE_GEONODES:
      return state.set('geonodesList', action.payload);

    default:
      return state;
  }
}
