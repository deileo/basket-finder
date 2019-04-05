import React, {Component, Suspense} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import MomentUtils from "@date-io/moment";
import { createMuiTheme } from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from "material-ui-pickers";
import CssBaseline from "@material-ui/core/CssBaseline";
import EventLoader from "./components/EventLoader";

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

const Application = React.lazy(() => import('./Application'));
const Admin = React.lazy(() => import('./Admin'));

class App extends Component {
 render() {
   return (
     <Suspense fallback={<div style={{height: '100vh'}}><EventLoader/></div>}>
       <BrowserRouter>
         <MuiThemeProvider theme={theme}>
           <MuiPickersUtilsProvider utils={MomentUtils}>
             <div>
               <CssBaseline />

               <Route path="/" exact component={Application}/>
               <Route path="/admin" exact component={Admin}/>

               <link
                 rel="stylesheet"
                 href="https://fonts.googleapis.com/icon?family=Material+Icons"
               />
             </div>
           </MuiPickersUtilsProvider>
         </MuiThemeProvider>
       </BrowserRouter>
     </Suspense>
   );
 }
}

export default withStyles(styles)(App);
