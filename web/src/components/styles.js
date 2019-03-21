export const navbarStyles = ({
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

export const eventListStyles = {
  root: {
    height: '93vh',
    overflowY: 'auto',
    width: '100%'
  },
  paper: {
    margin: 5,
    padding: 10,
    marginBottom: 5
  },
  textCenter: {
    textAlign: 'center',
    textAlignVertical: 'center',
  }
};

export const eventStyles = theme => ({
  eventContent: {
    fontSize: '.8rem',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  card: {
    maxWidth: '100%',
    margin: 5,
    padding: 10,
    marginBottom: 10
  },
  cardContent: {
    padding: '0 16px 0 16px',
    paddingBottom: '0!important'
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    width: theme.spacing.unit * 75,
  },
});

export const courtStyles = theme => ({
  container: {
    maxWidth: 280,
  },
  title: {
    fontSize: 20,
  },
  content: {
    paddingRight: 0,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 75,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});
