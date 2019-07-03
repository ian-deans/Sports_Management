import { combineReducers } from "redux";

import hqHouseholdReducer from "./hq/hqHouseholdReducer";
import hqRootReducer from "./hq/hqRootReducer";

export default combineReducers({
  root: hqRootReducer,
  households: hqHouseholdReducer,
});