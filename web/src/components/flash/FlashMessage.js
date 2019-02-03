import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import FlashContent from "./FlashContent";

class FlashMessage extends Component {
  handleClose = () => {
    this.props.closeFlashMessage();
  };

  render() {
    const {isOpen, message, variant, className } = this.props.flashMessage;

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

export default FlashMessage;