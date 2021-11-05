import { combineReducers } from "redux";
import userData from "./userData";
import items from "./items";
import search from "./search";
import settings from "./settings";
import itemUploading from "./itemUploading";

const rootReducer = combineReducers({
  userData,
  items,
  search,
  settings,
  itemUploading,
});

export default rootReducer;
