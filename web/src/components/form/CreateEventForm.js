import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography/Typography";
import {TimePicker, DatePicker} from 'material-ui-pickers';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {TYPE_COURT} from "../../actions/types";

class CreateEventForm extends Component {

  state = {
    name: '',
    comment: '',
    neededPlayers: 1,
    date: new Date(),
    startTime: new Date(),
    court: this.props.court.id,
  };

  componentDidMount() {
    const {event} = this.props;

    if (event) {
      this.setState({
        name: event.name,
        comment: event.comment ? event.comment : '',
        neededPlayers: event.neededPlayers,
        date: new Date(event.date),
        startTime: new Date(event.date + ' ' +event.startTime),
      });
    }
  }

  handleNeededPlayersChange = (event, neededPlayers) => {
    this.setState({neededPlayers});
  };

  handleCommentChange = (event) => {
    this.setState({comment: event.target.value});
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleDateChange = (date) => {
    this.setState({date: date});
  };

  handleStartTimeChange = startTime => {
    this.setState({startTime: startTime});
  };

  hasError(fieldName) {
    return this.props.eventReducer.errors && fieldName in this.props.eventReducer.errors;
  }

  getErrorMessage(fieldName) {
    if (!this.hasError(fieldName)) {
      return null;
    }

    return (
      <ul>
        {this.props.eventReducer.errors[fieldName].map((error) => {
          return (<li style={{color: '#f44336'}} key={error}>{error}</li>)
        })}
      </ul>
    );
  }

  handleSubmit = () => {
    if (!this.props.event) {
      this.props.createEventAction(this.state, TYPE_COURT);
    } else {
      this.props.editEventAction(this.state, this.props.event.id, TYPE_COURT);
    }
  };

  render() {
    const {classes, court, handleClose} = this.props;
    const {neededPlayers, date, startTime, name, comment} = this.state;

    return (
      <div>
        <Typography gutterBottom variant="h5" component="h4">
          {court.address}
        </Typography>
        <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <form className={classes.form} noValidate>
          <Grid container spacing={24}>

            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="name"
                  label="Varžybų pavadinimas"
                  value={name}
                  required={true}
                  error={this.hasError('name')}
                  onChange={this.handleNameChange}
                  variant="outlined"
                />
                {this.getErrorMessage('name')}
              </FormControl>
            </Grid>

            <Grid item sm={6}>
              <FormControl margin="normal" required fullWidth>
                <DatePicker autoOk
                            label="Data"
                            disablePast
                            value={date}
                            required={true}
                            error={this.hasError('date')}
                            format="YYYY-MM-DD"
                            onChange={this.handleDateChange}
                            variant="outlined"
                />
                {this.getErrorMessage('date')}
              </FormControl>
            </Grid>

            <Grid item sm={6}>
              <FormControl margin="normal" required fullWidth>
                <TimePicker autoOk
                            ampm={false}
                            label="Pradžios laikas"
                            value={startTime}
                            required={true}
                            onChange={this.handleStartTimeChange}
                            variant="outlined"
                            error={this.hasError('startTime')}
                />
                {this.getErrorMessage('startTime')}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel error={this.hasError('neededPlayers')}>
                  Reikiamas žaidėjų skaičius: {neededPlayers}
                </InputLabel>
                <Slider value={neededPlayers}
                        min={1}
                        max={10}
                        step={1}
                        onChange={this.handleNeededPlayersChange}
                        style={{marginBottom: 30}}
                        required={true}
                />
                {this.getErrorMessage('neededPlayers')}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="comment"
                  label="Komentaras"
                  value={comment}
                  error={this.hasError('comment')}
                  onChange={this.handleCommentChange}
                  multiline={true}
                  style={{marginBottom: 30}}
                  rows="3"
                  variant="outlined"
                />
                {this.getErrorMessage('comment')}
              </FormControl>
            </Grid>
          </Grid>

          <Button type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
          >
            {this.props.event ? 'Redaguoti' : 'Sukurti'}
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    courtsReducer: state.courtsReducer,
  };
};

const EventForm = connect(mapStateToProps, actions)(CreateEventForm);

export default withStyles({})(EventForm);
