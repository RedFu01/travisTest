import * as SearchState from './SearchState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import * as TextResourcesService from '../../services/textResourcesService'
import React from 'react';
import {
  PropTypes,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  DatePickerIOS,
  ScrollView,
  Switch,
} from 'react-native';

const TextResources = TextResourcesService.getLanguage();

const SearchView = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.function,
    loading: React.PropTypes.bool,
    searchOpen: React.PropTypes.bool,
    geonodesList: React.PropTypes.array,
    startStation: React.PropTypes.object,
    endStation: React.PropTypes.object,
    differentStations: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    currentPicker: React.PropTypes.object

  },
  /* Dispatches a messsage to open a date or station picker */
  openPicker(format, type){
    return()=>{
      this.props.dispatch(SearchState.setCurrentPicker({format:format,type:type}))
    }
  },
  /* Dispatches a message to whenever the switch to select or deselect a different return station is used */
  onSameStationChange(value){
    this.props.dispatch(SearchState.changeSameStation(value))
  },
  /* dispatches a message to load geonodes whenever the value in the textinput changes */
  onInputChange(value){
    this.props.dispatch(SearchState.requestGeonodes(value))
  },
  /* Handles clicks on the mainbutton of the page */
  onMainButtonClick(){
    if(this.props.searchOpen){
      this.props.dispatch(NavigationState.navigatePush({key:'Waiting'}))
    }else{
      this.props.dispatch(SearchState.openSearch());
    }
  },
  /* Dispatches a message whenever a station from the stationlist is selected */
  onStationClick(station, isStartStation){
    return () =>{
      if(isStartStation){
        this.props.dispatch(SearchState.setStartStation(station));
      }else{
        this.props.dispatch(SearchState.setEndStation(station));
      }
    }
  },
  /* dispatches a message when a date is selected */
  onDateChange(isStartDate){
    return (date)=>{
      if(isStartDate){
        this.props.dispatch(SearchState.setStartDate(date));
      }else{
        this.props.dispatch(SearchState.setEndDate(date));
      }
    }
  },
  /* renders the station select picker */
  renderStationSelect(isStartDate){
      return(
        <ScrollView>
          <TextInput onChangeText={this.onInputChange} style={styles.textInput}/>
          {this.props.geonodesList.map((city)=>{
            return(<Text key={Math.random()+''} onPress={this.onStationClick(city, isStartDate)}>{city.name}</Text>)
          })}
        </ScrollView>
      )
  },
  /* renders the datepicker */
  renderDatePicker(isStartDate){
      return( null);
      //<DatePickerIOS
        //date={isStartDate?this.props.startDate:this.props.endDate}
        //onDateChange={this.onDateChange(isStartDate)}>
      //</DatePickerIOS>);
  },
  /* wrappermethod to render the required picker */
  renderPicker(picker){
    if(!picker){
      return;
    }
    if(picker.format == 'date'){
      return this.renderDatePicker(picker.type == 'start')
    }else{
      return this.renderStationSelect(picker.type == 'start')
    }
  },
  /* renders the searchPopup with all its inputs */
  renderPopup(){
    if(this.props.searchOpen){
      return(
        <View style={styles.popUp}>
          <View>
            <Text style={styles.titleText}>{TextResources.START_LOCATION}</Text>
            <Text style={styles.selectionText} onPress={this.openPicker('station','start')}>{this.props.startStation?this.props.startStation.name:TextResources.START_LOCATION_DEFAULT}</Text>
          </View>
          <View>
            <Text style={styles.titleText}>{TextResources.START_DATE}</Text>
            <Text style={styles.selectionText} onPress={this.openPicker('date','start')}>{this.props.startDate+''}</Text>
          </View>
          <View style={styles.listEntry}>
            <Text style={styles.titleText}>{TextResources.DIFFERENT_END_LOCATION}</Text>
            <Switch value={this.props.differentStations} onValueChange={this.onSameStationChange}></Switch>
          </View>
          {this.props.differentStations && <Text style={styles.selectionText} onPress={this.openPicker('station','end')}>{this.props.endStation?this.props.endStation.name:TextResources.END_LOCATION_DEFAULT}</Text>}
          <View>
            <Text style={styles.titleText}>{TextResources.END_DATE}</Text>
            <Text style={styles.selectionText} onPress={this.openPicker('date','end')}>{this.props.endDate+''}</Text>
          </View>
          {this.renderPicker(this.props.currentPicker)}
      </View>)
    }else{
      return;
    }
  },
  /* Main render Method */
  render() {
    return (
      <View style={styles.mainContainer} key={'welcome'}>
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri:'https://media.giphy.com/media/5ixPU3qPdfeMM/giphy.gif'}} />
         </View>
          {false && this.renderPopup()}
       <Text onPress={this.onMainButtonClick} style={styles.button}>{this.props.searchOpen?TextResources.EXECUTE_SEARCH:TextResources.FIND_RENTAL_CAR}</Text>
    </View>
    );
  }
});

const styles = StyleSheet.create({
  mainContainer:{
    paddingTop:60,
    flex:1,
  },
  textInput:{
    height: 30,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding:2
  },
  titleText:{
    fontSize: 20,
    flex:1,
  },
  listEntry:{
    flexDirection:'row'
  },
  selectionText:{
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
  },
  switch:{
    width:60,
  },
  popUp:{
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius:6 ,
    height: 100,
    flex: 1,
    margin: 20,
    padding:10,
    marginBottom: 70
  },
  button:{
    position:'absolute',
    bottom: 20,
    right: 20,
    width: 200,
    flex: 0.3,
    textAlign:'center',
    height: 40,
    lineHeight: 30,
    color: 'white',
    backgroundColor: '#086ab1',
  },
  imageContainer: {
    position:'absolute',
    top:0,
    bottom:-60,
    left:0,
    right:0,
  },
  image:{
    flex: 1,
    resizeMode: 'cover',
  }
});

export default SearchView;
