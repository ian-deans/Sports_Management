/* eslint-disable no-console */
import { logRedux } from "../../helpers/log";


export default store =>
  next => action => {
    console.group( action.type );
    logRedux( "Dispatching: ", action );
    logRedux( "Store:  ", store );
    console.groupEnd();

    let result = next( action );
    return result;
  };