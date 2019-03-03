import React, {Component} from 'react';
import {MAP_CENTER, MAP_URL, MAP_ZOOM} from '../../config';
import AppMap from "./AppMap";
import Loader from "../MapLoader";
import {TYPE_COURT} from "../../actions/types";

class Map extends Component {

  state = {
    activeMarker: null
  };

  componentDidMount() {
    this.props.fetchCourtsAction(this.props.courtsReducer.type ? this.props.courtsReducer.type : TYPE_COURT);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevCourtType = prevProps.courtsReducer.type;
    let courtType = this.props.courtsReducer.type;

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
          courts={this.props.courtsReducer}
          handleMarkerClick={this.handleMarkerClick}
          activeMarker={this.state.activeMarker}
        />
      </div>
    );
  }
}

export default Map;
