import {connect} from 'react-redux';
import WelcomeView from './WelcomeView';

export default connect(
  state => ({
    loading: state.getIn(['welcome', 'loading']),
    searchOpen: state.getIn(['welcome','searchOpen']),
    geonodesList: state.getIn(['welcome','geonodesList']),
    startStation: state.getIn(['welcome','startStation']),
    endStation: state.getIn(['welcome','endStation']),
    differentStations: state.getIn(['welcome','differentStations']),
    startDate: state.getIn(['welcome','startDate']),
    endDate: state.getIn(['welcome','endDate']),
    currentPicker: state.getIn(['welcome','currentPicker'])
  })
)(WelcomeView);
