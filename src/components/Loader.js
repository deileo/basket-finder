import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  box: {
    position: "fixed",
    height: '100%',
    width: '100%',
    backgroundColor: "rgba(245, 245, 245, .7)",
    zIndex: 2,
  },
  progress: {
    position: "absolute",
    top: '45%',
    left: '35%',
    marginTop: -35.5,
    marginLeft: -35.5,
  },
});

const Loader = ({classes}) => (
  <div className={classes.box}>
    <CircularProgress className={classes.progress} size={75} />
  </div>
);

export default withStyles(styles)(Loader);
