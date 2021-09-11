import { combineReducers } from "redux";
import userData from "./userData";
import items from "./items";
import search from "./search";
import settings from "./settings";

const rootReducer = combineReducers({
  userData,
  items,
  search,
  settings,
});

export default rootReducer;
