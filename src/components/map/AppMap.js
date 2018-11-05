import React from "react";
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import CourtMarker from "./CourtMarker";

const AppMap = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
  >
    {props.courts.map(court => {
      return <CourtMarker key={court.id} court={court}/>
    })}
  </GoogleMap>
));

export default AppMap