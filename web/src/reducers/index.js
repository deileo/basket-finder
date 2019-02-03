import { combineReducers } from 'redux';
import navReducer from './nav.reducer';
import loaderReducer from './loader.reducer';
import courtsReducer from './courts.reducer';
import eventReducer from './event.reducer';
import flashReducer from './flash.reducer';
import modalReducer from './modal.reducer';

const reducers = combineReducers({
  navReducer,
  loaderReducer,
  courtsReducer,
  eventReducer,
  flashReducer,
  modalReducer
});

export default reducers;
