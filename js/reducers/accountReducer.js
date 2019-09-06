import { combineReducers } from "redux";

import accountRootReducer from "./account/accountRootReducer";
import playerRegistrationReducer from "./account/playerRegistrationReducer";

export default combineReducers( {
  root: accountRootReducer,
  playerRegistration: playerRegistrationReducer
} );
