import { connect } from 'react-redux';
import Map from '../components/map/Map';
import * as actions from '../actions';

const mapStateToProps = state => {
  return {
    courtsReducer: state.courtsReducer,
    loaderReducer: state.loaderReducer
  };
};

const MapContainer = connect(mapStateToProps, actions)(Map);

export default MapContainer;
