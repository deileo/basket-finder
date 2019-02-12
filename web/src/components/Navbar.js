import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List/List";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import {TYPE_COURT} from "../actions/types";

const styles = ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawer: {
    width: 'auto',
    flexShrink: 0,
  },
  drawerPaper: {
    width: 'auto',
    top: '4rem'
  },
});

class Navbar extends Component {
  state = {
    open: false,
    type: TYPE_COURT,
  };

  componentDidMount() {
    this.props.changeCourtType(TYPE_COURT)
  }

  toggleDrawer = (open) => () => {
    this.setState({open});
  };

  handleChange = (event, type) => {
    this.props.changeCourtType(type);
    this.props.fetchCourts(type);
    this.setState({ type });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Basket Finder
            </Typography>
            <Tabs value={this.state.type} onChange={this.handleChange}>
              <Tab label="Lauko aiksteles" />
              <Tab label="Vidaus aisteles" />
            </Tabs>
            <Button color="inherit" onClick={this.toggleDrawer(!this.state.open)}>
              Filtrai
            </Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          className={classes.drawer}
          variant="persistent"
          anchor="top"
          open={this.state.open}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
            style={{top: '4rem'}}
          >
          <div className={classes.fullList}>
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
