import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import React, {Component} from "react";
import moment from "moment";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import { withStyles } from '@material-ui/core/styles';
import InfoModal from "./InfoModal";
import Modal from "@material-ui/core/Modal/Modal";

const styles = theme => ({
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
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class Event extends Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  getEventTime = event => {
    let startTime = moment.unix(event.startTime.timestamp);
    let endTime = moment.unix(event.endTime.timestamp);
    let date = moment(event.date);

    return date.format('YYYY-MM-DD') + ' ' + startTime.format('H:mm') + ' - ' + endTime.format('H:mm');
  };

  render() {
    const {event, classes} = this.props;
    return (
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" gutterBottom>
              {event.name}
            </Typography>
            <hr/>
            <Table>
              <TableBody>
                <TableRow className={classes.tableRow}>
                  <TableCell component="th" scope="row">Kurejas</TableCell>
                  <TableCell align="left">{event.creatorFirstName} {event.creatorLastName}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell component="th" scope="row">Data</TableCell>
                  <TableCell align="left">{this.getEventTime(event)}</TableCell>
                </TableRow>
                {event.court.address ?
                  <TableRow className={classes.tableRow}>
                    <TableCell component="th" scope="row">Adresas</TableCell>
                    <TableCell align="left">{event.court.address}</TableCell>
                  </TableRow> : ''
                }
                <TableRow className={classes.tableRow}>
                  <TableCell component="th" scope="row">Dalyvių kiekis</TableCell>
                  <TableCell align="left">{event.neededPlayers}/{event.neededPlayers}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell component="th" scope="row">Komentaras</TableCell>
                  <TableCell align="left">{event.comment ? event.comment : '-'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <CardActions>
              <Button size="small" variant="contained" color="primary">
                Prisijungti
              </Button>
              <Button size="small" variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Kontaktine informacija
              </Button>

              <Modal
                open={this.state.open}
                onClose={this.handleClose}
              >
                <div style={getModalStyle()} className={classes.paper}>
                  <InfoModal
                      firstName={event.creatorFirstName}
                      lastName={event.creatorLastName}
                      email={event.creatorEmail}
                      phoneNumber={event.creatorPhoneNumber}
                      onClose={this.handleClose}
                      open={this.state.open}
                    />
                  </div>
              </Modal>
            </CardActions>
          </CardContent>
        </Card>
    )
  }
}

export default withStyles(styles)(Event);
