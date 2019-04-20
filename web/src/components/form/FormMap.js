import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import {MAP_CENTER, MAP_URL, MAP_ZOOM} from "../../config";
import icon from "../../icon-56.png";

const FormMap = compose(
  withStateHandlers(() => ({
    isMarkerShown: false,
    markerPosition: null
  }), {
    onMapClick: ({ isMarkerShown }) => (e) => ({
      markerPosition: e.latLng,
      isMarkerShown: true
    })
  }),
  withScriptjs,
  withGoogleMap
) (props =>
  <GoogleMap
    defaultZoom={MAP_ZOOM}
    defaultCenter={MAP_CENTER}
    googleMapURL={MAP_URL}
    onClick={props.onMapClick}
  >
    {props.isMarkerShown}

    {props.isMarkerShown &&
      <Marker
        position={props.markerPosition}
        options={{icon: icon}}
        onPositionChanged={props.handleLatLng(props.markerPosition)}
      />
    }

  </GoogleMap>
);

export default FormMap;
