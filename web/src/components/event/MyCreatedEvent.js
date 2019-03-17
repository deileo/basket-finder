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

class MyCreatedEvent extends Component {

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
          {event.comment ?
            <Typography component="p" gutterBottom style={{color: 'rgba(0, 0, 0, 0.54)'}}>
              Aprasymas: {event.comment.substring(0, 100)}{event.comment.length > 100 ? '...' : ''}
            </Typography> : ''
          }
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={this.handleJoin}>
              Redaguoti
            </Button>
            <Button size="small" variant="contained" color="secondary" onClick={this.handleLeave}>
              Ištrinti
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    )
  }
}

export default connect(null, actions)(withStyles(eventStyles)(MyCreatedEvent));
