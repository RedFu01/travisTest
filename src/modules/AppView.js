import React from 'react';
import {View, PropTypes, StyleSheet, StatusBar} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import AppRouter from './AppRouter';
import Spinner from 'react-native-gifted-spinner';
import * as snapshotUtil from '../utils/snapshot';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

const AppView = React.createClass({
  propTypes: {
  },

  render() {
    return (
      <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
      />
        <NavigationViewContainer router={AppRouter} />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AppView;
