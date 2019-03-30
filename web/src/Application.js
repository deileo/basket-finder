import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FlashMessage from "./components/flash/FlashMessage";
import Navbar from "./components/navbar/Navbar";
import EventList from "./components/event/EventList";
import Map from "./components/map/Map";

class Application extends Component {
  render() {
    return (
      <div>
        <Grid item xs={12}>
            <Navbar />
          </Grid>
          <Grid>
            <FlashMessage />
          </Grid>
          <Grid container>
            <Grid item lg={3} xs={12}>
              <EventList />
            </Grid>
            <Grid item lg={9} xs={12}>
              <Map />
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default withStyles({})(Application);
