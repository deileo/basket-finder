import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {eventStyles} from '../styles';
import {getEventTime} from '../../services/eventService';
import {connect} from 'react-redux';
import * as actions from './../../actions';

class MyJoinedEvent extends Component {

  handleLeave = () => {
    const {userReducer, event, type} = this.props;

    this.props.leaveEventAction(userReducer.auth.googleAccessToken, event.id, type);
    this.props.getUserJoinedEventsAction(userReducer.auth.googleAccessToken)
  };

  render () {
    const {event, type, classes} = this.props;

    return (
      <Card className={classes.card} key={event.id}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h4">
            {event.name}
          </Typography>
          <hr/>
          <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
            Laikas: {getEventTime(event, type)}
          </Typography>
          <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
            Adresas: {event.court ? event.court.address : event.gymCourt.address}
          </Typography>
          <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
            Zaidejai: {event.participants.length}/{event.neededPlayers}
          </Typography>
          {event.price && event.price > 0 ?
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
            <Button size="small" variant="outlined" color="primary" onClick={this.handleOpenInfoModalClick}>
              Informacija
            </Button>
            <Button size="small" variant="contained" color="secondary" onClick={this.handleLeave}>
              Išeiti
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(MyJoinedEvent));
