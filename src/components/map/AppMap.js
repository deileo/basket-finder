import React from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

const AppMap = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={props.center}
    >
        {props.courts.map(court => {
            return <Marker
                key={court.id}
                position={{ lat: court.lat, lng: court.long }}
                title={court.address}
            />
        })}
    </GoogleMap>
));

export default AppMap