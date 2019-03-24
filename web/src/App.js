import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import FlashMessage from "./components/flash/FlashMessage";
import Navbar from "./components/navbar/Navbar";
import EventList from "./components/event/EventList";
import Map from "./components/map/Map";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFD54F',
      main: '#004D40',
      dark: '#FF6F00',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f44336'
    },
    error: {
      main: '#FF6F00',
      contrastText: '#fff'
    }
  },
  typography: {
    fontSize: 12,
    useNextVariants: true,
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
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

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
