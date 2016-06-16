import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as ajaxService from '../../services/ajaxService';

// Initial state
const initialState = Map({

});

// Actions
const EXAMPLE_ACTION = "StationsState/EXAMPLE_ACTION"

// Action creators


// Reducer
export default function StationsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
