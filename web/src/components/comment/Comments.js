import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import FormControl from '@material-ui/core/FormControl/index';
import TextField from '@material-ui/core/TextField/index';
import Button from '@material-ui/core/Button/index';
import Grid from '@material-ui/core/Grid/index'
import Typography from "@material-ui/core/Typography/Typography";
import { connect } from 'react-redux';
import * as actions from "../../actions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import CommentList from "./CommentList";

class Comments extends Component {

  state = {
    comment: '',
  };

  handleCommentChange = (event) => {
    this.setState({comment: event.target.value});
  };

  handleSubmit = () => {
    const {event, court, type} = this.props;

    if (court) {
      this.props.createCourtCommentAction(this.state, court, type);
    }

    if (event) {
      this.props.createEventCommentAction(this.state, event, type);
    }

    this.setState({comment: ''});
  };

  render() {
    const {classes, handleClose, court, event, type, userReducer} = this.props;
    const {comment} = this.state;

    return (
      <div>
        <Typography gutterBottom variant="h5" component="h4">
          Komentarai
        </Typography>
        <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <CommentList court={court} event={event} type={type}/>
        {userReducer.isAuthenticated ?
          <form className={classes.form} noValidate>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    id="comment"
                    label="Komentaras"
                    value={comment}
                    onChange={this.handleCommentChange}
                    multiline={true}
                    rows="3"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>

              <Button type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={!this.state.comment || this.state.comment.length > 255}
                      className={classes.submit}
                      onClick={this.handleSubmit}
              >
                {this.state.comment.length > 255 ? 'Komentaras per ilgas' : 'Siųsti'}
              </Button>
            </Grid>
          </form>
        : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
  };
};

export default withStyles({})(connect(mapStateToProps, actions)(Comments));
