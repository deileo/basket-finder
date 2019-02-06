import React, {Component} from 'react';
import Loader from "../Loader";
import Paper from '@material-ui/core/Paper';
import Event from "./Event";
import Typography from "@material-ui/core/Typography/Typography";

class EventList extends Component {

  render() {
    const {courtsReducer} = this.props;
    let court = courtsReducer ? courtsReducer.court : null;

    if (!court) {
      return null;
    }

    return (
      <div>
        {this.props.loaderReducer.isLoading && (
          <Loader/>
        )}

        <Paper style={{ margin: 5, padding: 10, marginBottom: 25 }} elevation={1}>
          <Typography variant="h5" component="h3">
            {court.address}
          </Typography>
          <Typography component="p">
            {court.location}
          </Typography>
        </Paper>
        {court.events.map(event => {
          return (
            <Event key={event.id} event={event} />
          )
        })}
      </div>
    );
  }
}

export default EventList;