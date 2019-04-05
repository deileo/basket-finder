import React from "react";
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import CourtMarker from "./CourtMarker";
import {connect} from "react-redux";
import * as actions from '../../actions';

const AppMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
  >
    {props.courtsReducer.data.map(court => {
      return <CourtMarker
        key={court.id}
        court={court}
        handleMarkerClick={props.handleMarkerClick}
        activeMarker={props.activeMarker}
      />
    })}
  </GoogleMap>
));

const mapStateToProps = state => {
  return {
    courtsReducer: state.courtsReducer,
  };
};

export default connect(mapStateToProps, actions)(AppMap);
