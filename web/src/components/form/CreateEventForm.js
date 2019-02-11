import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid'
import moment from 'moment';
import Typography from "@material-ui/core/Typography/Typography";
import {TimePicker, DatePicker} from 'material-ui-pickers';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';

class CreateEventForm extends Component {

  state = {
    creatorFirstName: '',
    creatorLastName: '',
    creatorPhoneNumber: '',
    creatorEmail: '',
    name: '',
    comment: '',
    neededPlayers: 1,
    date: moment().format('YYYY-MM-DD'),
    startTime: null,
    endTime: null,
    court: this.props.court.id,
  };

  handleNeededPlayersChange = (event, neededPlayers) => {
    this.setState({neededPlayers});
  };

  handleFirstNameChange = (event) => {
    this.setState({creatorFirstName: event.target.value});
  };

  handleLastNameChange = (event) => {
    this.setState({creatorLastName: event.target.value});
  };

  handleEmailChange = (event) => {
    this.setState({creatorEmail: event.target.value});
  };

  handlePhoneNumberChange = (event) => {
    this.setState({creatorPhoneNumber: event.target.value});
  };

  handleCommentChange = (event) => {
    this.setState({comment: event.target.value});
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleDateChange = date => {
    this.setState({date});
  };

  handleEndTimeChange = endTime => {
    this.setState({endTime: endTime});
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
    this.props.createEventAction(this.state);
  };

  render() {
    const {classes, court, handleClose} = this.props;
    const {neededPlayers, date, startTime, endTime, creatorFirstName, creatorLastName, creatorEmail, creatorPhoneNumber, name, comment} = this.state;

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

            <Grid item sm={6} xs={12}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="first-name"
                  label="Vardas"
                  value={creatorFirstName}
                  required={true}
                  error={this.hasError('creatorFirstName')}
                  onChange={this.handleFirstNameChange}
                />
                {this.getErrorMessage('creatorFirstName')}
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="last-name"
                  label="Pavarde"
                  value={creatorLastName}
                  required={true}
                  error={this.hasError('creatorLastName')}
                  onChange={this.handleLastNameChange}
                />
                {this.getErrorMessage('creatorLastName')}
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <TextField
                  id="email"
                  label="El. pastas"
                  value={creatorEmail}
                  error={this.hasError('creatorEmail')}
                  onChange={this.handleEmailChange}
                />
                {this.getErrorMessage('creatorEmail')}
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <TextField
                  id="phone-number"
                  label="Telefono nr."
                  value={creatorPhoneNumber}
                  error={this.hasError('creatorPhoneNumber')}
                  onChange={this.handlePhoneNumberChange}
                />
                {this.getErrorMessage('creatorPhoneNumber')}
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="name"
                  label="Varžybų pavadinimas"
                  value={name}
                  required={true}
                  error={this.hasError('name')}
                  onChange={this.handleNameChange}
                />
                {this.getErrorMessage('name')}
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <DatePicker autoOk
                            label="Data"
                            value={date}
                            required={true}
                            format="YYYY-MM-DD"
                            onChange={this.handleDateChange}
                />
                {this.getErrorMessage('date')}
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <TimePicker autoOk
                                ampm={false}
                                label="Pradzios laikas"
                                value={startTime}
                                required={true}
                                onChange={this.handleStartTimeChange}
                />
                {this.getErrorMessage('startTime')}
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <TimePicker autoOk
                                ampm={false}
                                label="Pabaigos laikas"
                                value={endTime}
                                required={true}
                                onChange={this.handleEndTimeChange}
                />
                {this.getErrorMessage('endTime')}
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel error={this.hasError('neededPlayers')}>Reikiamas žaidėjų skaičius: {neededPlayers}</InputLabel>
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
                  rows="3"
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
            Sukurti
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    courtsReducer: state.courtsReducer
  };
};

const EventForm = connect(mapStateToProps, actions)(CreateEventForm);

export default withStyles({})(EventForm);
