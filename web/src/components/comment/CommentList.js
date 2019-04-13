import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {eventStyles} from '../styles';
import {connect} from 'react-redux';
import * as actions from './../../actions';
import Typography from "@material-ui/core/es/Typography/Typography";
import {isArrayNotEmpty} from "../../services/eventService";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import EventLoader from "../EventLoader";

class CommentList extends Component {

  componentDidMount() {
    const {event, court, type} = this.props;

    if (court) {
      this.props.getCourtCommentsAction(court, type);
    }

    if (event) {
      this.props.getEventCommentsAction(event, type);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {commentReducer, court, event, type} = this.props;

    if (commentReducer && commentReducer.reload) {
      if (court) {
        this.props.getCourtCommentsAction(court, type);
      }

      if (event) {
        this.props.getEventCommentsAction(event, type);
      }

      this.props.resetCourtCommentsAction();
    }
  }

  componentWillUnmount() {
    this.props.resetCourtCommentsAction();
  }

  render() {
    const {classes, commentReducer, loaderReducer} = this.props;

    if (loaderReducer.isCommentsLoading) {
      return (
        <div>
          <List className={classes.root} style={{height: '35vh'}}>
            <EventLoader/>
          </List>
        </div>
      )
    }

    return (
      <List className={classes.root} style={{height: '35vh', overflowY: 'scroll'}}>
        {isArrayNotEmpty(commentReducer.comments) ? commentReducer.comments.map(comment => {
          let user = comment.createdBy;
          return (
            <ListItem alignItems="flex-start" key={comment.id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.googleImage}/>
              </ListItemAvatar>
              <div style={{marginLeft: 10}}>
                <ListItemText
                  style={{padding: 0}}
                  primary={comment.comment}
                  secondary={user.firstName + ' ' + user.lastName + ' ' + comment.createdAt}
                />
              </div>
            </ListItem>
          )
        }) : <Typography className={classes.textCenter} variant="h5">Nėra komentarų</Typography>}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    commentReducer: state.commentReducer,
    loaderReducer: state.loaderReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(CommentList));
