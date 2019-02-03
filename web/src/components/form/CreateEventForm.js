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
import {DateTimePicker} from 'material-ui-pickers';
import { connect } from 'react-redux';
import * as actions from "../../actions";

class CreateEventForm extends Component {

  state = {
    creatorFirstName: '',
    creatorLastName: '',
    creatorPhoneNumber: '',
    creatorEmail: '',
    name: '',
    comment: '',
    neededPlayers: 1,
    startTime: moment().format('YYYY-MM-DD H:00'),
    endTime: moment().format('YYYY-MM-DD H:00'),
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

  handleEndTimeChange = date => {
    this.setState({endTime: date});
  };

  handleStartTimeChange = date => {
    this.setState({startTime: date});
  };

  hasError(fieldName) {
    return this.props.errors && fieldName in this.props.errors;
  }

  getErrorMessage(fieldName) {
    if (!this.hasError(fieldName)) {
      return null;
    }

    return (
      <ul>
        {this.props.errors[fieldName].map((error) => {
          return (<li style={{color: '#f44336'}} key={error}>{error}</li>)
        })}
      </ul>
    );
  }

  handleSubmit = () => {
    this.props.createEventAction(this.state);
  };

  render() {
    const {classes, court} = this.props;
    const {neededPlayers, startTime, endTime, creatorFirstName, creatorLastName, creatorEmail, creatorPhoneNumber, name, comment} = this.state;

    return (
      <div>
        <Typography gutterBottom variant="h5" component="h4">
          {court.address}
        </Typography>
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
                <DateTimePicker autoOk
                                ampm={false}
                                label="Pradzios laikas"
                                value={startTime}
                                required={true}
                                format="YYYY-MM-DD HH:mm"
                                onChange={this.handleStartTimeChange}
                />
                {this.getErrorMessage('startTime')}
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <DateTimePicker autoOk
                                ampm={false}
                                label="Pabaigos laikas"
                                value={endTime}
                                required={true}
                                format="YYYY-MM-DD HH:mm"
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
  if (state.eventReducer) {
    return {
      created: state.eventReducer.created,
      errors: state.eventReducer.errors
    };
  }

  return {}
};

const EventForm = connect(mapStateToProps, actions)(CreateEventForm);

export default withStyles({})(EventForm);