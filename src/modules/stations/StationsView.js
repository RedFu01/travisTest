import * as StationsState from './StationsState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React from 'react';
import {
  PropTypes,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  MapView,
  Animated,
  View,
  ScrollView
} from 'react-native';

let bounceValue = new Animated.Value(1.5);

const StationsView = React.createClass({
  propTypes: {
  },
  componentDidMount() {
    bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      bounceValue,                 // Animate `bounceValue`
      {
        toValue: 1                         // Bouncier spring
      }
    ).start();                                // Start the animation
  },

  render() {
    console.log(this.props)
    return (
      <ScrollView style={styles.scrollView}>
        {this.props.geonodesList.map((node)=>{return(<View style={styles.listEntry}><Text>{node.name}</Text></View>)})}
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
    scrollView:{
      flex:1,
      paddingTop:60,
    },
    listEntry:{
      height: 60,
      borderBottomWidth:1,
      borderBottomColor: 'black',
      marginLeft: 20,
      paddingLeft:10,
      paddingRight:10,
      marginRight: 20,
      justifyContent: 'center',
    }
});

export default StationsView;
