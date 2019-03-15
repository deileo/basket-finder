import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import {TYPE_GYM_COURT} from "../../actions/types";
import * as moment from "moment";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const styles = theme => ({
    eventContent: {
        fontSize: '1rem',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    card: {
        maxWidth: '100%',
        margin: 5,
        padding: 10,
        marginBottom: 25
    },
    cardContent: {
        padding: '0 16px 0 16px',
        paddingBottom: '0!important'
    },
    tableRow: {
        height: 32
    },
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        width: theme.spacing.unit * 75,
    },
});

class MyJoinedEvents extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.open && this.props.open) {
            this.props.getUserJoinedEventsAction(this.props.user.googleAccessToken)
        }
    }

    handleClose = () => {
        this.props.toggleMyJoinedEventModalAction(false);
    };

    handleLeave = () => {
        const {userReducer, event, type} = this.props;
        this.props.leaveEventAction(userReducer.auth.googleAccessToken, event.id, type);
    };

    getEventTime = (event, type) => {
        let startTime = moment.unix(event.startTime.timestamp);
        let eventTime = moment.unix(event.date.timestamp).format('YYYY-MM-DD') + ' ' + startTime.format('H:mm');

        if (type === TYPE_GYM_COURT && event.endTime) {
            eventTime += ' - ' + moment.unix(event.endTime.timestamp).format('H:mm');
        }

        return eventTime;
    };

    render() {
        const {eventReducer, classes, type} = this.props;

        if (!eventReducer.userJoinedEvents) {
            return null;
        }

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
                        {eventReducer.userJoinedEvents.map(event => {
                            return (
                                <Card className={classes.card} key={event.id}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h5" component="h4">
                                            {event.name}
                                        </Typography>
                                        <hr/>
                                        <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
                                            Laikas: {this.getEventTime(event, type)}
                                        </Typography>
                                        <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
                                            Adresas: {event.court ? event.court.address : event.gymCourt.address}
                                        </Typography>
                                        <Typography variant="h6" component="h4" gutterBottom className={classes.eventContent}>
                                            Zaidejai: {event.participants.length}/{event.neededPlayers}
                                        </Typography>
                                        {event.comment ?
                                            <Typography component="p" gutterBottom style={{color: 'rgba(0, 0, 0, 0.54)'}}>
                                                Aprasymas: {event.comment.substring(0, 100)}{event.comment.length > 100 ? '...' : ''}
                                            </Typography> : ''
                                        }
                                        <CardActions>
                                            <Button size="small" variant="outlined" color="primary" onClick={this.handleOpenInfoModalClick}>
                                                Informacija
                                            </Button>
                                            <Button size="small" variant="contained" color="secondary" onClick={this.handleLeave}>
                                                Išeiti
                                            </Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(MyJoinedEvents);
