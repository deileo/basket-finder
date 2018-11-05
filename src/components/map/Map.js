import React, {Component} from 'react';
import {MAP_CENTER, MAP_URL, MAP_ZOOM} from '../../config';
import axios from 'axios';
import AppMap from "./AppMap";

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {'courts': []};
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/courts/all')
      .then((response) => {
        if (response.status === 200) {
          this.setState({'courts': response.data});
        }
      });
  }

  render() {
    return (
      <AppMap
        zoom={MAP_ZOOM}
        center={MAP_CENTER}
        googleMapURL={MAP_URL}
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `93vh`}}/>}
        mapElement={<div style={{height: `100%`}}/>}
        courts={this.state.courts}
      />
    );
  }
}

export default Map;