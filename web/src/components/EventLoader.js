import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  box: {
    display: 'block',
    position: 'relative',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
  },
  progress: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
});

const EventLoader = ({classes}) => (
  <div className={classes.box}>
    <CircularProgress className={classes.progress} size={75} />
  </div>
);

export default withStyles(styles)(EventLoader);
