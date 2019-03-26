import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography/Typography";
import { connect } from 'react-redux';
import * as actions from "../../actions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/es/Grid/Grid";
import {DropzoneArea} from 'material-ui-dropzone'

class CreatePermissionRequestForm extends Component {

  state = {
    file: null,
    message: '',
    gymCourt: this.props.gymCourt.id,
  };

  handleCommentChange = (event) => {
    this.setState({message: event.target.value});
  };

  hasError(fieldName) {
    // return this.props.eventReducer.errors && fieldName in this.props.eventReducer.errors;
  }

  getErrorMessage(fieldName) {
    if (!this.hasError(fieldName)) {
      return null;
    }
  }

  handleSubmit = () => {
    this.props.sendPermissionRequestAction(this.state, this.props.userReducer.auth.googleAccessToken);
    console.log(this.state);
  };

  handleChange = (files) => {
    console.log(files);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      this.setState({file: e.target.result});
    };
  };

  render() {
    const {classes, gymCourt, handleClose} = this.props;
    return (
      <div>
        <Typography gutterBottom variant="h5" component="h4">
          {gymCourt.name}
        </Typography>
        <Typography gutterBottom component="p">
          {gymCourt.address} ({gymCourt.location})
        </Typography>
        <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <form className={classes.form} noValidate>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <DropzoneArea
                onChange={this.handleChange}
                showPreviews={false}
                showAlerts={false}
                dropzoneText={"Sutarties failo ikelimo vieta"}
                maxFileSize={5000000}
                filesLimit={1}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="message"
                  label="Komentaras"
                  error={this.hasError('message')}
                  onChange={this.handleCommentChange}
                  multiline={true}
                  rows="3"
                  variant="outlined"
                />
                {this.getErrorMessage('message')}
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleSubmit}
          >
            Siusti
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
  };
};

export default withStyles({})(connect(mapStateToProps, actions)(CreatePermissionRequestForm));
