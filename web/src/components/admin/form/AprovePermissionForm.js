import React, {Component} from 'react';
import * as actions from "../../../actions";
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import {DatePicker} from "material-ui-pickers";
import {connect} from "react-redux";

class AprovePermissionForm extends Component {

  state = {
    validUntil: new Date(),
  };

  componentDidMount() {
    this.props.resetPermisionRequestState();
  }

  handleValidUntilChange = (date) => {
    this.setState({validUntil: date});
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
    let accessToken = this.props.userReducer.auth.googleAccessToken;
    this.props.approvePermissionRequestAction(this.props.permission.id, this.state, accessToken);
  };

  render() {
    const {classes, permission, handleClose} = this.props;
    const {validUntil} = this.state;

    return (
      <div>
        <Typography gutterBottom variant="h5" component="h4">
          {permission.gymCourt.name + ' (' + permission.user.firstName + ' ' + permission.user.lastName + ')'}
        </Typography>
        <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <form className={classes.form} noValidate>
          <Grid container spacing={24}>
            <Grid item sm={12}>
              <FormControl margin="normal" required fullWidth>
                <DatePicker autoOk
                            label="Leidimo galiojimo laikas"
                            disablePast
                            value={validUntil}
                            required={true}
                            error={this.hasError('validUntil')}
                            format="YYYY-MM-DD"
                            onChange={this.handleValidUntilChange}
                            variant="outlined"
                />
                {this.getErrorMessage('validUntil')}
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
            Patvirtinti
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    permissionReducer: state.permissionReducer,
    userReducer: state.userReducer,
  };
};

export default withStyles({})(connect(mapStateToProps, actions)(AprovePermissionForm));
