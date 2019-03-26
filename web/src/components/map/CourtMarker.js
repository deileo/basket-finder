import React, {Component} from "react";
import {InfoWindow, Marker} from "react-google-maps";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import CreateEventForm from "../form/CreateEventForm";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../actions";
import icon  from "../../icon-56.png";
import {TYPE_COURT} from "../../actions/types";
import CreateGymEventForm from "../form/CreateGymEventForm";
import {courtStyles, modalStyles} from "../styles";
import CreatePermissionRequestForm from "../form/CreatePermissionRequestForm";

class CourtMarker extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.props.openCreateEventModalAction();
  };

  handleRequestOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  handleClose = () => {
    this.props.closeCreateEventModalAction();
    this.props.removeEventErrorsAction();
  };

  renderInfoWindow = (court, classes, activeMarker, modalReducer, courtReducer, userReducer) => {
    if (activeMarker === court.id) {
      return (
        <InfoWindow>
          <div className={classes.container}>
            {courtReducer.type === TYPE_COURT ?
              this.renderCourtWindow(court, userReducer, classes) :
              this.renderGymCourtWindow(court, userReducer, classes)
            }
            <Modal
              open={modalReducer.isCreateEventOpen}
              onClose={this.handleClose}
            >
              <div style={modalStyles} className={classes.paper}>
                {courtReducer.type === TYPE_COURT ?
                  <CreateEventForm court={court} handleClose={this.handleClose}/> :
                  <CreateGymEventForm court={court} handleClose={this.handleClose}/>
                }
              </div>
            </Modal>

            <Modal
              open={this.state.open}
              onClose={this.handleRequestClose}
            >
              <div style={modalStyles} className={classes.paper}>
                <CreatePermissionRequestForm gymCourt={court} handleClose={this.handleRequestClose}/>
              </div>
            </Modal>


          </div>
        </InfoWindow>
      )
    }
  };

  renderCourtWindow(court, userReducer, classes) {
    return (
      <div>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h4" className={classes.title}>
            {court.address}
          </Typography>
          <hr/>
          <Typography component="p">
            Rajonas: {court.location}
          </Typography>
          <Typography component="p">
            Informacija: {court.description}
          </Typography>
        </CardContent>
        <CardActions>
          {userReducer.isAuthenticated ?
            <Button size="small" variant="contained" color="primary" onClick={this.handleOpen}>
              Skelbti varzybas
            </Button> : ''
          }
        </CardActions>
      </div>
    )
  }

  renderGymCourtWindow(court, userReducer, classes) {
    return (
      <div>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h4" className={classes.title}>
            {court.name}
          </Typography>
          <hr/>
          <Typography component="p">
            Adresas: {court.address} ({court.location})
          </Typography>
          <Typography component="p">
            Būklė: {court.condition}
          </Typography>
        </CardContent>
        <CardActions>
          {userReducer.isAuthenticated ?
            <div>
              <Button size="small" variant="contained" color="primary" onClick={this.handleOpen}>
                Skelbti varzybas
              </Button>
              <Button size="small" variant="contained" color="default" onClick={this.handleRequestOpen}>
                Siusti prasyma
              </Button>
            </div>
            : ''
          }
        </CardActions>
      </div>
    )
  }

  render() {
    const {court, classes, handleMarkerClick, activeMarker, modalReducer, courtsReducer, userReducer} = this.props;

    return (
      <Marker
        key={court.id}
        position={{lat: court.lat, lng: court.long}}
        title={court.address}
        onClick={() => handleMarkerClick(court.id)}
        options={{icon: icon}}
      >
        {this.renderInfoWindow(court, classes, activeMarker, modalReducer, courtsReducer, userReducer)}
      </Marker>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalReducer: state.modalReducer,
    courtsReducer: state.courtsReducer,
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(courtStyles)(CourtMarker));
