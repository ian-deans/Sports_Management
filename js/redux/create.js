import { createStore, applyMiddleware, } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "./middleware/logger";
import reducer from "./modules/reducer";

//TODO: Need something to watch for context changes (organization and household only)
//TODO: and other parts of state to reflect the changes in context?

export default function configureStore( initialState ) {

  const middleware = [
    thunkMiddleware,
    loggerMiddleware
  ];

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        ...middleware
      ) )
  );

  return store;
}
