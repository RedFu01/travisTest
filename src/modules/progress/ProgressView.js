import * as ProgressState from './ProgressState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React from 'react';
import {
  PropTypes,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

const ProgressView = React.createClass({
  propTypes: {
  },

  onClick(){
    this.props.dispatch(NavigationState.navigateOnewayPush({key:'Stations',title:'Stations'}))
  },

  render() {
    return (
      <View style={{flex:1}}>
        <Text style={styles.text}>Loading</Text>
        <Text onPress={this.onClick}> Go Ahead! </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
    text:{
      flex:1,
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center',
      paddingTop:200,
      fontSize: 30,
      textAlign: 'center',
    }
});

export default ProgressView;
