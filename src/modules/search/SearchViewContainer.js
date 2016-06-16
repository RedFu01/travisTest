import {connect} from 'react-redux';
import SearchView from './SearchView';

export default connect(
  state => ({
    loading: state.getIn(['search', 'loading']),
    searchOpen: state.getIn(['search','searchOpen']),
    geonodesList: state.getIn(['search','geonodesList']),
    startStation: state.getIn(['search','startStation']),
    endStation: state.getIn(['search','endStation']),
    differentStations: state.getIn(['search','differentStations']),
    startDate: state.getIn(['search','startDate']),
    endDate: state.getIn(['search','endDate']),
    currentPicker: state.getIn(['search','currentPicker'])
  })
)(SearchView);
