import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux"; //! deprecated package

import app from "../../reducers/appReducer";
import account from "../../reducers/accountReducer";
import forms from "../../reducers/formsReducer";
import hq from "../../reducers/hqReducer";
import ui from "../../reducers/uiReducer";
import { organizationSetupReducer as organizationSetup } from "./organizationSetup/reducer";

const reducer = combineReducers( {
  // routing: routerReducer,
  app,
  account,
  forms,
  hq,
  ui,
  organizationSetup,
} );

export default ( state, action ) => {
  if ( action.type === "RESET_APP" ) {
    state = undefined;
  }
  return reducer( state, action );
};
