import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import * as actions from "../../actions";

class JoinEventForm extends Component {

  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    photo: null
  };

  componentDidMount() {
    const {userReducer} = this.props;

    if (userReducer && userReducer.isAuthenticated) {
      let user = userReducer.auth;
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photo: user.googleImage,
      });
    }
  }

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
    this.props.joinEventAction(this.state, this.props.event.id);
  };

  render() {
    const {classes, event, handleClose} = this.props;
    const {firstName, lastName, email, phoneNumber} = this.state;

    return (
      <div>
        <Typography gutterBottom variant="h5" component="h4">
          {event.name}
        </Typography>
        <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <form className={classes.form} noValidate>
          <Grid container spacing={24}>

            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="first-name"
                  label="Vardas"
                  value={firstName}
                  required={true}
                  error={this.hasError('firstName')}
                  onChange={this.handleFirstNameChange}
                />
                {this.getErrorMessage('firstName')}
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="last-name"
                  label="Pavarde"
                  value={lastName}
                  required={true}
                  error={this.hasError('lastName')}
                  onChange={this.handleLastNameChange}
                />
                {this.getErrorMessage('lastName')}
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <TextField
                  id="email"
                  label="El. pastas"
                  value={email}
                  error={this.hasError('email')}
                  onChange={this.handleEmailChange}
                />
                {this.getErrorMessage('email')}
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <TextField
                  id="phone-number"
                  label="Telefono nr."
                  value={phoneNumber}
                  error={this.hasError('phoneNumber')}
                  onChange={this.handlePhoneNumberChange}
                />
                {this.getErrorMessage('phoneNumber')}
              </FormControl>
            </Grid>

            <Button type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSubmit}
            >
              Prisijungti
            </Button>
          </Grid>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    userReducer: state.userReducer,
  };
};

const form = connect(mapStateToProps, actions)(JoinEventForm);

export default withStyles({})(form);
