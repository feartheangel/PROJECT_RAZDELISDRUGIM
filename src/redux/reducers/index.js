import { combineReducers } from 'redux';
import userData from './userData';
import items from './items';
import search from './search';

const rootReducer = combineReducers({
  userData,
  items,
  search,
});

export default rootReducer;
