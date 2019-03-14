import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";

class MyCreatedEvents extends Component {

    handleClose = () => {
        this.props.toggleMyEventModalAction(false);
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    maxWidth={'sm'}
                    fullWidth={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Mano sukūrtos varžybos
                        <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                        <hr/>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            My created events
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles({})(MyCreatedEvents);
