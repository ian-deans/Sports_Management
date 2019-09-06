/* eslint-disable no-console */
import { createStore, applyMiddleware, } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { logRedux } from "../helpers/log";

//TODO: Need something to watch for context changes (organization and household only)
//TODO: and other parts of state to reflect the changes in context?

const logger = store => next => action => {

  console.group( action.type );
  logRedux( "Dispatching: ", action );
  logRedux( "Store:  ", store );
  console.groupEnd();

  let result = next( action );
  return result;
};

const store = createStore(
  rootReducer,
  composeWithDevTools( applyMiddleware( logger, thunk ) )
);

export const listener = () => {
  const state = store.getState();
  if ( state.app.organization_context && state.hq.root.organization_data ) {
    if ( state.app.organization_context.active_context_id !== state.hq.root.organization_data.id ) {
      console.group( "Redux Store Listener" );
      logRedux( "App active organization context changed and does not match Hq organization id!" );
      console.groupEnd();
    }

  }
};
// store.subscribe(hqStateListener);
store.subscribe( listener );

export default store;