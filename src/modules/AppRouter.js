/*eslint-disable react/prop-types*/

import React from 'react';
import SearchViewContainer from './search/SearchViewContainer';
import ProgressViewContainer from './progress/ProgressViewContainer';
import StationsViewContainer from './stations/StationsViewContainer';
//__DEV__ = false;
/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const onNavigate = props.onNavigate;
  const key = props.scene.navigationState.key;

  if (key === 'Search') {
    return(<SearchViewContainer onNavigate={onNavigate} />);
  }
  if (key === 'Progress') {
    return(<ProgressViewContainer onNavigate={onNavigate} />);
  }
  if (key === 'Stations') {
    return(<StationsViewContainer onNavigate={onNavigate} />);
  }

  throw new Error('Unknown navigation key: ' + key);
}
