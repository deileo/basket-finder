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

const styles = theme => ({
  container: {
    maxWidth: 280,
  },
  title: {
    fontSize: 20,
  },
  content: {
    paddingRight: 0,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 75,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class CourtMarker extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.props.openModalAction();
  };

  handleClose = () => {
    this.props.closeModalAction();
  };

  renderInfoWindow = (court, classes, activeMarker, modalReducer) => {
    if (activeMarker === court.id) {
      return (
        <InfoWindow>
          <div className={classes.container}>
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h5" component="h4" className={classes.title}>
                {court.address}
              </Typography>
              <hr/>
              <Typography component="p">
                {court.location}
              </Typography>
              <Typography component="p">
                {court.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"  variant="contained" color="primary" onClick={this.handleOpen}>
                Skelbti varzybas
              </Button>
            </CardActions>
            <Modal
              open={modalReducer.isOpen}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <CreateEventForm court={court} handleClose={this.handleClose}/>
              </div>
            </Modal>
          </div>
        </InfoWindow>
      )
    }
  };

  render() {
    const {court, classes, handleMarkerClick, activeMarker, modalReducer} = this.props;

    return (
      <Marker
        key={court.id}
        position={{lat: court.lat, lng: court.long}}
        title={court.address}
        onClick={() => handleMarkerClick(court.id)}
        options={{icon: 'https://img.icons8.com/metro/26/000000/basketball.png'}}
      >
        {this.renderInfoWindow(court, classes, activeMarker, modalReducer)}
      </Marker>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalReducer: state.modalReducer
  };
};

export default connect(mapStateToProps, actions)(withStyles(styles)(CourtMarker));
