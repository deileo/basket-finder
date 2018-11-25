import React, {Component} from "react";
import {InfoWindow, Marker} from "react-google-maps";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import CreateEventForm from "../form/CreateEventForm";

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
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderInfoWindow = (court, classes, activeMarker) => {
    if (activeMarker === court.id) {
      return (
        <InfoWindow>
          <Card className={classes.container}>
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
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <CreateEventForm court={court} handleClose={this.handleClose}/>
              </div>
            </Modal>
          </Card>
        </InfoWindow>
      )
    }
  };

  render() {
    const {court, classes, handleMarkerClick, activeMarker} = this.props;

    return (
      <Marker
        key={court.id}
        position={{lat: court.lat, lng: court.long}}
        title={court.address}
        onClick={() => handleMarkerClick(court.id)}
      >
        {this.renderInfoWindow(court, classes, activeMarker)}
      </Marker>
    );
  }
}

export default withStyles(styles)(CourtMarker);