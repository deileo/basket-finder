import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import FlashContent from "./FlashContent";
import {connect} from "react-redux";
import * as actions from '../../actions';

class FlashMessage extends Component {
  handleClose = () => {
    this.props.closeFlashMessage();
  };

  render() {
    const {isOpen, message, variant, className } = this.props.flashReducer;

    if (!isOpen) {
      return null;
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isOpen}
        onClose={this.handleClose}
      >
        <FlashContent
          onClose={this.handleClose}
          variant={variant}
          message={message}
          className={className}
        />
      </Snackbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    flashReducer: state.flashReducer,
  };
};

export default connect(mapStateToProps, actions)(FlashMessage);
