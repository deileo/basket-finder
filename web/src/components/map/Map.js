import React, {Component} from 'react';
import {MAP_CENTER, MAP_URL, MAP_ZOOM} from '../../config';
import AppMap from "./AppMap";
import Loader from "../Loader";

class Map extends Component {

  state = {
    'activeMarker': null
  };

  componentDidMount() {
    this.props.fetchCourtsAction();
  }

  handleMarkerClick = (courtId) => {
    this.setState({'activeMarker': courtId});
    this.props.fetchCourtById(courtId);
  };

  render() {
    return (
      <div>
        {this.props.loaderReducer.isLoading && (
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