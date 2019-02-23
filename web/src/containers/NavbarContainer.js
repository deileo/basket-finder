import { connect } from 'react-redux';
import * as actions from '../actions';
import Navbar from "../components/navbar/Navbar";

const mapStateToProps = state => {
  return {
    courtsReducer: state.courtsReducer,
    eventReducer: state.eventReducer,
    loaderReducer: state.loaderReducer,
    userReducer: state.userReducer
  };
};

const NavbarContainer = connect(mapStateToProps, actions)(Navbar);

export default NavbarContainer;
