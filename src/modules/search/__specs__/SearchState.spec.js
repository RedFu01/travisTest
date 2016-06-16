/*eslint-disable max-nested-callbacks, no-unused-expressions*/

import {Effects} from 'redux-loop';
import sinon from 'sinon';
import {describe, it, beforeEach, afterEach} from 'mocha';
import {expect} from 'chai';
import {initialState, dispatch} from '../../../../test/state';
import * as SearchStateActions from '../SearchState';

describe('SearchState', () => {

  // Example of how to test multiple dispatches in series
  describe('popup', () => {
    const getValue = state => state.getIn(['search', 'searchOpen']);

    it('should open the popup', () => {
      const [secondState] = dispatch(initialState, SearchStateActions.openSearch());
      expect(getValue(secondState)).to.equal(true);
    });
  });
});
