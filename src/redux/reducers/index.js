import { combineReducers } from 'redux';
import userData from './userData';
import items from './items';

const rootReducer = combineReducers({
  userData,
  items,
});

export default rootReducer;
