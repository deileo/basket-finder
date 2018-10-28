import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Map from './components/map/Map';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <Navbar/>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            HAHAHHAHAH
          </Grid>
          <Grid item xs={8}>
            <Map/>
          </Grid>
        </Grid>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </div>
    );
  }
}

export default App;
