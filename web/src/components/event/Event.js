import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import React, {Component} from "react";
import moment from "moment";
import Paper from "@material-ui/core/Paper/Paper";

class Event extends Component {

  getEventTime = event => {
    let startTime = moment(event.startTime);
    let endTime = moment(event.endTime);

    return startTime.format('MM-DD H:mm') + ' - ' + endTime.format('H:mm');
  };

  render() {
    const {event} = this.props;
    return (
      <Paper style={{ margin: 5, padding: 10, marginBottom: 25 }} elevation={1}>
        <Table>
          <TableHead>
            <TableRow style={{height: 34}}>
              <TableCell style={{fontSize: 16}}>{event.name}</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{height: 34}}>
              <TableCell component="th" scope="row">
                Kurejo vardas
              </TableCell>
              <TableCell component="th" scope="row">
                {event.creatorFirstName} {event.creatorLastName}
              </TableCell>
            </TableRow>

            <TableRow style={{height: 34}}>
              <TableCell component="th" scope="row">
                Kurejo el. pastas
              </TableCell>
              <TableCell component="th" scope="row">
                {event.creatorEmail}
              </TableCell>
            </TableRow>

            <TableRow style={{height: 34}}>
              <TableCell component="th" scope="row">
                Kurejo tel.nr
              </TableCell>
              <TableCell component="th" scope="row">
                {event.creatorPhoneNumber}
              </TableCell>
            </TableRow>

            <TableRow style={{height: 34}}>
              <TableCell component="th" scope="row">
                Komentaras
              </TableCell>
              <TableCell component="th" scope="row">
                {event.comment ? event.comment : '-'}
              </TableCell>
            </TableRow>

            <TableRow style={{height: 34}}>
              <TableCell component="th" scope="row">
                Planuojamas laikas
              </TableCell>
              <TableCell component="th" scope="row">
                {this.getEventTime(event)}
              </TableCell>
            </TableRow>

            <TableRow style={{height: 34}}>
              <TableCell component="th" scope="row">
                Dalyvių kiekis
              </TableCell>
              <TableCell component="th" scope="row">
                {event.neededPlayers}/{event.neededPlayers}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default Event