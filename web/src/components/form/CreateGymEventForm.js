import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import Typography from "@material-ui/core/Typography/Typography";
import {TimePicker, DatePicker} from 'material-ui-pickers';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";

class CreateGymEventForm extends Component {

  state = {
    creatorPhoneNumber: '',
    price: 0,
    name: '',
    comment: '',
    neededPlayers: 1,
    date: null,
    startTime: null,
    endTime: null,
    gymCourt: this.props.court.id,
  };

  handleNeededPlayersChange = (event, neededPlayers) => {
    this.setState({neededPlayers});
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

  handlePriceChange = (event) => {
    this.setState({price: event.target.value});
  };

  handleDateChange = (date) => {
    this.setState({date: date});
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
    this.props.createGymEventAction(this.state, this.props.userReducer.auth.googleAccessToken);
  };

  render() {
    const {classes, court, handleClose} = this.props;
    const {neededPlayers, date, startTime, endTime, creatorPhoneNumber, name, comment, price} = this.state;

    return (
      <div>
        <Typography gutterBottom variant="h5" component="h4">
          {court.name}
        </Typography>
        <Typography gutterBottom component="p">
          {court.address} ({court.location})
        </Typography>
        <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <form className={classes.form} noValidate>
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

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="price">Kaina</InputLabel>
            <Input
              id="price"
              value={price}
              error={this.hasError('price')}
              onChange={this.handlePriceChange}
              required={false}
              startAdornment={<InputAdornment position="start">€</InputAdornment>}
            />
            {this.getErrorMessage('price')}
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
            />
            {this.getErrorMessage('comment')}
          </FormControl>

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
    courtsReducer: state.courtsReducer,
    userReducer: state.userReducer,
  };
};

const GymEventForm = connect(mapStateToProps, actions)(CreateGymEventForm);

export default withStyles({})(GymEventForm);
