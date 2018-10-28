import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import {MAP_ZOOM, MAP_CENTER, MAP_URL} from '../../config';

const MyMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={MAP_ZOOM}
    defaultCenter={MAP_CENTER}
  >
  </GoogleMap>
));

class Map extends Component {
  render() {
    return (
        <MyMap
          googleMapURL={MAP_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `93vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
    );
  }
}

export default Map;