import { combineReducers } from "redux";

import appReducer from "./appReducer";
import accountReducer from "./accountReducer";
import formsReducer from "./formsReducer";
import hqReducer from "./hqReducer";
import uiReducer from "./uiReducer";

// import organizationSetupReducer from "./organizationSetupReducer";

const allReducers = combineReducers( {
  app: appReducer,
  account: accountReducer,
  forms: formsReducer,
  hq: hqReducer,
  ui: uiReducer,
  // organizationSetup: organizationSetupReducer,
} );

const rootReducer = ( state, action ) => {
  if ( action.type === "RESET_APP" ) {
    state = undefined;
  }
  return allReducers( state, action );
};

export default rootReducer;