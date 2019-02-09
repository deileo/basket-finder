import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MapContainer from './containers/MapContainer';
import Navbar from './components/Navbar';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import FlashMessage from "./components/flash/FlashMessage";
import EventListContainer from "./containers/EventListContainer";

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
    }
  },
  typography: {
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
          <Navbar/>
        </Grid>
        <Grid>
          <FlashMessage closeFlashMessage={this.props.closeFlashMessage} flashMessage={this.props.flashReducer}/>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <EventListContainer />
          </Grid>
          <Grid item xs={9}>
            <MapContainer />
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
