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
  textCenter: {
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

export const courtStyles = theme => ({
  container: {
    width: 280,
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

const drawerWidth = 240;
export const adminNavbarStyles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

export const tableStyles = theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
  },
  cell: {
    fontSize: 12,
    color: theme.palette.primary.contrastText,
  },
  dataCell: {
    fontSize: 14,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    width: theme.spacing.unit * 50,
  },
});

export const modalStyles = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
