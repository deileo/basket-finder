import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import moment from 'moment';
import Typography from "@material-ui/core/Typography/Typography";
import {DateTimePicker} from 'material-ui-pickers';

class CreateEventForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: null,
      comment: null,
      needed_players: 0,
      min_participants: 0,
      start_at: moment().format('YYYY-MM-DD H:00'),
      end_at: moment().format('YYYY-MM-DD H:00'),
      selectedDate: new Date(),
    };
  }

  handleNeededPlayersChange = (event, needed_players) => {
    this.setState({needed_players});
  };

  handleCommentChange = (event) => {
    this.setState({comment: event.target.value});
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleEndTimeChange = date => {
    this.setState({end_at: date});
  };

  handleStartTimeChange = date => {
    this.setState({start_at: date});
  };

  handleSubmit = (event) => {
    // this.props.createEventAction(Object.assign({}, this.state, {
    //   start_at: moment(this.state.start_at).format('YYYY-MM-DD H:mm'),
    //   end_at: moment(this.state.end_at).format('YYYY-MM-DD H:mm'),
    // }));
  };

  render() {
    const {classes, court} = this.props;
    const {needed_players, start_at, end_at} = this.state;

    return (
      <div>
        <Typography gutterBottom variant="h5" component="h4">
          {court.address}
        </Typography>
        <form className={classes.form} noValidate>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Varžybų pavadinimas</InputLabel>
            <Input id="name"
                   name="name"
                   autoFocus
                   onChange={this.handleNameChange}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <DateTimePicker autoOk
                            ampm={false}
                            label="Pradzios laikas"
                            value={start_at}
                            format="YYYY-MM-DD H:mm"
                            onChange={this.handleStartTimeChange}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <DateTimePicker autoOk
                            ampm={false}
                            label="Pabaigos laikas"
                            value={end_at}
                            format="YYYY-MM-DD H:i"
                            onChange={this.handleEndTimeChange}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth style={{'marginBottom': 30}}>
            <InputLabel>Reikiamas žaidėjų skaičius: {needed_players}</InputLabel>
            <Slider value={needed_players}
                    min={0} max={10}
                    step={1}
                    onChange={this.handleNeededPlayersChange}
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="comment">Komentaras</InputLabel>
            <Input name="comment" id="comment" multiline={true} rows="3" onChange={this.handleCommentChange}/>
          </FormControl>

          <Button type="button" fullWidth variant="contained" color="primary" className={classes.submit}
                  onClick={this.handleSubmit}>
            Sukurti
          </Button>
        </form>
      </div>
    )
  }
}

export default withStyles({})(CreateEventForm);