import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography/Typography";
import { connect } from 'react-redux';
import * as actions from "../../actions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import FormMap from "./FormMap";
import {MAP_URL} from "../../config";
import {TYPE_COURT} from "../../actions/types";
import InputLabel from "@material-ui/core/InputLabel";

class CreateCourtForm extends Component {

  state = {
    description: '',
    location: '',
    lat: null,
    long: null,
  };

  hasError(fieldName) {
    return this.props.courtsReducer.errors && fieldName in this.props.courtsReducer.errors;
  }

  getErrorMessage(fieldName) {
    if (!this.hasError(fieldName)) {
      return null;
    }

    return (
      <ul>
        {this.props.courtsReducer.errors[fieldName].map((error) => {
          return (<li style={{color: '#f44336'}} key={error}>{error}</li>)
        })}
      </ul>
    );
  }

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  handleLocationChange = (event) => {
    this.setState({location: event.target.value});
  };

  handleOnMapClick = (latLng) => {
    let lat = latLng.lat();
    let long = latLng.lng();

    if (lat !== this.state.lat || long !== this.state.long) {
      this.setState({lat: lat});
      this.setState({long: long});
    }
  };

  handleSubmit = () => {
    this.props.createCourtAction(this.state, TYPE_COURT);
  };

  render() {
    const {classes, handleClose} = this.props;
    const {description, location} = this.state;

    return (
      <div>
        <Typography gutterBottom variant="h5" component="h4">
          Nauja lauko aikštelė
        </Typography>
        <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <form className={classes.form} noValidate>
          <Grid container spacing={24}>

            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="location"
                  label="Rajonas"
                  value={location}
                  required={true}
                  error={this.hasError('location')}
                  onChange={this.handleLocationChange}
                  variant="outlined"
                />
                {this.getErrorMessage('location')}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="description"
                  label="Informacija"
                  value={description}
                  error={this.hasError('description')}
                  onChange={this.handleDescriptionChange}
                  multiline={true}
                  rows="3"
                  variant="outlined"
                />
                {this.getErrorMessage('description')}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel error={this.hasError('lat')} style={{top: -50}}>Pasirinkite lokaciją</InputLabel>
                  <FormMap
                    googleMapURL={MAP_URL}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{height: `30vh`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                    handleLatLng={this.handleOnMapClick}
                    style={{marginBottom: 30}} />
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
            Siųsti
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    courtsReducer: state.courtsReducer,
  };
};

export default withStyles({})(connect(mapStateToProps, actions)(CreateCourtForm));
