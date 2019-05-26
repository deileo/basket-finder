import React, {Component} from 'react';
import {MAP_CENTER, MAP_URL, MAP_ZOOM} from '../../config';
import AppMap from "./AppMap";
import Loader from "../MapLoader";
import {TYPE_COURT, TYPE_GYM_COURT} from "../../actions/types";
import {connect} from "react-redux";
import * as actions from '../../actions';

class Map extends Component {

  state = {
    activeMarker: null
  };

  componentDidMount() {
    const {courtsReducer} = this.props;
    this.props.fetchCourtsAction(courtsReducer.type ? courtsReducer.type : TYPE_COURT);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevCourtType = prevProps.courtsReducer.type;
    let courtType = this.props.courtsReducer.type;
    let permissionReducer = this.props.permissionReducer;
    let prevPermissionReducer = prevProps.permissionReducer;

    if (permissionReducer && prevPermissionReducer) {
      if(!prevPermissionReducer.created && permissionReducer.created) {
        this.handleMarkerClick(this.state.activeMarker);
        this.props.resetPermisionRequestState();
      }
    }

    if (prevCourtType !== courtType) {
      this.setState({activeMarker: null});
      this.props.setCourtToNull();
    }
  }

  handleMarkerClick = (courtId) => {
    let type = this.props.courtsReducer.type;
    if (courtId === this.state.activeMarker) {
      courtId = null;
    }

    this.setState({activeMarker: courtId});
    if (courtId) {
      this.props.fetchCourtById(type, courtId);
      this.props.getEventsAction(type, courtId);
      if (type === TYPE_GYM_COURT) {
        this.props.getGymCourtPermissionAction(courtId)
      }
    } else {
      this.props.setCourtToNull();
      this.props.getEventsAction(type);
    }
  };

  render() {
    return (
      <div>
        {this.props.loaderReducer.isMapLoading && (
          <Loader/>
        )}
        <AppMap
          zoom={MAP_ZOOM}
          center={MAP_CENTER}
          googleMapURL={MAP_URL}
          loadingElement={<div style={{height: `100%`}}/>}
          containerElement={<div style={{height: `93vh`}}/>}
          mapElement={<div style={{height: `100%`}}/>}
          handleMarkerClick={this.handleMarkerClick}
          activeMarker={this.state.activeMarker}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courtsReducer: state.courtsReducer,
    loaderReducer: state.loaderReducer,
    permissionReducer: state.permissionReducer
  };
};

export default connect(mapStateToProps, actions)(Map);
