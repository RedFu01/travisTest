import React from 'react';
import {
  View,
  PropTypes,
  StyleSheet,
  Text,
  NavigationExperimental as Navigation
} from 'react-native';

const {
	Transitioner: NavigationTransitioner,
	Card: NavigationCard,
	Header: NavigationHeader,
} = Navigation;

const NavigationView = React.createClass({
render(){
  let { navigationState, onNavigate } = this.props
  return (
    <NavigationTransitioner
      navigationState={navigationState}
      onNavigate={onNavigate}
      style={styles.container}
      renderOverlay={props => (
        <NavigationHeader
          {...props}
          style={styles.navbar}
          renderTitleComponent={props => {
            const title = props.scene.navigationState.title
            return <NavigationHeader.Title>
              <Text style={styles.navbarTitle}>
              {title}
              </Text>
            </NavigationHeader.Title>
          }}
      />
      )}
      renderScene={props => (
        <NavigationCard
          {...props}
          panHandlers={undefined }
          key={props.scene.navigationState.key}
          renderScene={this.props.router}
        />
      )}
    />
  )
  }
});

const styles = StyleSheet.create({
  navbar:{
    backgroundColor: '#086ab1',
  },
  navbarTitle:{
    color: 'white',
  },
  container: {
    flex: 1
  },
  viewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  hidden: {
    overflow: 'hidden',
    width: 0,
    height: 0
  }
});

export default NavigationView;
