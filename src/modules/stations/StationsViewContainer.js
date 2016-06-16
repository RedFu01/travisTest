import {connect} from 'react-redux';
import StationsView from './StationsView';

export default connect(
  state => ({
    geonodesList: state.getIn(['search','geonodesList']),
  })
)(StationsView);
