import React, {Component} from "react";
import {InfoWindow, Marker} from "react-google-maps";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    maxWidth: 280,
  },
  title: {
    fontSize: 20,
  },
  content: {
    paddingRight: 0,
  }
};

class CourtMarker extends Component {

  constructor(props) {
    super(props);
    this.state = {'isOpen': false};
  }

  handleOnMarkerClick = () => {
    this.setState(prev => ({
      'isOpen': !prev.isOpen
    }));
  };

  renderInfoWindow = (court, classes) => {
    if (this.state.isOpen) {
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
              <Button size="small"  variant="contained" color="primary">
                Skelbti varzybas
              </Button>
            </CardActions>
          </Card>
        </InfoWindow>
      )
    }
  };

  render() {
    const {court, classes} = this.props;

    return (
      <Marker
        key={court.id}
        position={{lat: court.lat, lng: court.long}}
        title={court.address}
        onClick={this.handleOnMarkerClick}
      >
        {this.renderInfoWindow(court, classes)}
      </Marker>
    );
  }
}

export default withStyles(styles)(CourtMarker);