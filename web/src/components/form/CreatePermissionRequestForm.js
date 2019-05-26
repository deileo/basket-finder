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

  allowedFiles = [
    'image/*',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text'
  ];

  componentDidMount() {
    this.props.resetPermisionRequestState();
  }

  handleCommentChange = (event) => {
    this.setState({message: event.target.value});
  };

  hasError(fieldName) {
    return this.props.permissionReducer.errors && fieldName in this.props.permissionReducer.errors;
  }

  getErrorMessage(fieldName) {
    if (!this.hasError(fieldName)) {
      return null;
    }

    return (
      <ul>
        {this.props.permissionReducer.errors[fieldName].map((error) => {
          return (<li style={{color: '#f44336'}} key={error}>{error}</li>)
        })}
      </ul>
    );
  }

  handleSubmit = () => {
    this.props.sendPermissionRequestAction(this.state);
  };

  handleChange = (files) => {
    this.setState({file: files[0]});
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
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="message"
                  label="Prašymas"
                  error={this.hasError('message')}
                  onChange={this.handleCommentChange}
                  multiline={true}
                  rows="3"
                  variant="outlined"
                  required={true}
                />
                {this.getErrorMessage('message')}
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{marginBottom: 30}}>
              <DropzoneArea
                onChange={this.handleChange}
                showPreviews={false}
                showAlerts={false}
                dropzoneText={"Sutarties failo įkėlimo vieta"}
                maxFileSize={5000000}
                filesLimit={1}
                acceptedFiles={this.allowedFiles}
              />
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
            Siųsti
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    permissionReducer: state.permissionReducer,
  };
};

export default withStyles({})(connect(mapStateToProps, actions)(CreatePermissionRequestForm));
