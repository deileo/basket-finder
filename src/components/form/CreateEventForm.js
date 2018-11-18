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

class CreateEventForm extends Component {

  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    name: '',
    comment: '',
    needed_players: 0,
    min_participants: 0,
    start_at: moment().format('YYYY-MM-DD H:00'),
    end_at: moment().format('YYYY-MM-DD H:00'),
    selectedDate: new Date(),
  };

  handleNeededPlayersChange = (event, needed_players) => {
    this.setState({needed_players});
  };

  handleFirstNameChange = (event) => {
    this.setState({firstName: event.target.value});
  };

  handleLastNameChange = (event) => {
    this.setState({lastName: event.target.value});
  };

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  };

  handlePhoneNumberChange = (event) => {
    this.setState({phoneNumber: event.target.value});
  };

  handleCommentChange = (event) => {
    this.setState({comment: event.target.value});
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleEndTimeChange = date => {
    this.setState({end_at: date});
  };

  handleStartTimeChange = date => {
    this.setState({start_at: date});
  };

  handleSubmit = (event) => {
    // this.props.createEventAction(Object.assign({}, this.state, {
    //   start_at: moment(this.state.start_at).format('YYYY-MM-DD H:mm'),
    //   end_at: moment(this.state.end_at).format('YYYY-MM-DD H:mm'),
    // }));
  };

  render() {
    const {classes, court} = this.props;
    const {needed_players, start_at, end_at} = this.state;

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
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="last-name"
                  label="Pavarde"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="email"
                  label="El. pastas"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="phone-number"
                  label="Telefono nr."
                  value={this.state.phoneNumber}
                  onChange={this.handlePhoneNumberChange}
                />
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="name"
                  label="Varžybų pavadinimas"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <DateTimePicker autoOk
                                ampm={false}
                                label="Pradzios laikas"
                                value={start_at}
                                format="YYYY-MM-DD HH:mm"
                                onChange={this.handleStartTimeChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <DateTimePicker autoOk
                                ampm={false}
                                label="Pabaigos laikas"
                                value={end_at}
                                format="YYYY-MM-DD HH:mm"
                                onChange={this.handleEndTimeChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel>Reikiamas žaidėjų skaičius: {needed_players}</InputLabel>
                <Slider value={needed_players}
                        min={1}
                        max={10}
                        step={1}
                        onChange={this.handleNeededPlayersChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="comment"
                  label="Komentaras"
                  value={this.state.comment}
                  onChange={this.handleCommentChange}
                  multiline={true}
                  rows="3"
                />
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

export default withStyles({})(CreateEventForm);