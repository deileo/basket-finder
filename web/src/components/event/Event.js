import React, {Component} from "react";
import moment from "moment";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import { withStyles } from '@material-ui/core/styles';
import InfoModal from "./InfoModal";
import Modal from "@material-ui/core/Modal/Modal";
import {TYPE_COURT, TYPE_GYM_COURT} from "../../actions/types";

const styles = theme => ({
  eventContent: {
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  card: {
    maxWidth: '100%',
    margin: 5,
    padding: 10,
    marginBottom: 25
  },
  cardContent: {
    padding: '0 16px 0 16px',
    paddingBottom: '0!important'
  },
  tableRow: {
    height: 32
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    width: theme.spacing.unit * 75,
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

class Event extends Component {

  state = {
    infoModalOpen: false,
  };

  handleOpenInfoModalClick = () => {
    this.setState({infoModalOpen: true});
  };

  handleCloseInfoModalClick = () => {
    this.setState({infoModalOpen: false});
  };

  handleJoin = () => {
    const {userReducer, event, type} = this.props;
    this.props.joinEventAction(userReducer.auth.googleAccessToken, event.id, type)
  };

  getEventTime = (event, type) => {
    let startTime = moment.unix(event.startTime.timestamp);
    let eventTime = moment.unix(event.date.timestamp).format('YYYY-MM-DD') + ' ' + startTime.format('H:mm');

    if (type === TYPE_GYM_COURT) {
      eventTime += ' - ' + moment.unix(event.endTime.timestamp).format('H:mm');
    }

    return eventTime;
  };

  render() {
    const {userReducer, type, event, classes} = this.props;

    return (
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" component="h4">
              {event.name}
            </Typography>
            <hr/>
            <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
              Laikas: {this.getEventTime(event, type)}
            </Typography>
            <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
              Adresas: {event.court ? event.court.address : event.gymCourt.address}
            </Typography>
            <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
              Zaidejai: 0/{event.neededPlayers}
            </Typography>
            {type === TYPE_GYM_COURT && event.price > 0 ?
              <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
                Kaina: {event.price} €
              </Typography> : ''
            }
            {event.comment ?
              <Typography component="p" gutterBottom style={{color: 'rgba(0, 0, 0, 0.54)'}}>
                Aprasymas: {event.comment.substring(0, 100)}{event.comment.length > 100 ? '...' : ''}
              </Typography> : ''
            }
            <CardActions>
              {userReducer.isAuthenticated ?
                <Button size="small" variant="contained" color="primary" onClick={this.handleJoin}>
                  Prisijungti
                </Button> : ''
              }
              <Button size="small" variant="outlined" color="primary" onClick={this.handleOpenInfoModalClick}>
                Informacija
              </Button>

              <Modal
                open={this.state.infoModalOpen}
                onClose={this.handleClose}
              >
                <div style={getModalStyle()} className={classes.paper}>
                  <InfoModal
                      event={event}
                      onClose={this.handleCloseInfoModalClick}
                      open={this.state.infoModalOpen}
                      type={type}
                    />
                  </div>
              </Modal>
            </CardActions>
          </CardContent>
        </Card>
    )
  }
}

export default withStyles(styles)(Event);
