import { connect } from 'react-redux';
import App from '../App';
import * as actions from '../actions';

const mapStateToProps = state => {
  return {
    flashReducer: state.flashReducer,
    loaderReducer: state.loaderReducer
  };
};

const AppContainer = connect(mapStateToProps, actions)(App);

export default AppContainer;