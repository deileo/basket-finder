import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table/Table";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton/IconButton";

class InfoModal extends Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    if (!this.props.open) {
      return null;
    }
    const {firstName, lastName, email, phoneNumber} = this.props;

    return (
      <div>
        <Typography  gutterBottom variant="h5" component="h4">
          Kurejo informacija
        </Typography>
        <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={this.handleClose}>
          <CloseIcon />
        </IconButton>
        <hr/>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">Vardas pavarde</TableCell>
              <TableCell align="left">{firstName} {lastName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">El. pastas</TableCell>
              <TableCell align="left">{email ? email : '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Tel nr.</TableCell>
              <TableCell align="left">{phoneNumber ? phoneNumber : '-'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default InfoModal;