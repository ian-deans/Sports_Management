import { createStore, applyMiddleware, } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools( applyMiddleware( thunk ))
);

//TODO: Need something to watch for context changes (organization and household only)
//TODO: and other parts of state to reflect the changes in context?

// export const appStateListener = () => console.log("App State", store.getState().app)
// export const hqStateListener = () => console.log("Hq State", store.getState().hq)

export const listener = () => {
  const state = store.getState();
  if (state.app.organization_context && state.hq.root.organization_data) {
    if (state.app.organization_context.active_context_id !== state.hq.root.organization_data.id) {
      console.warn("App active organization context changed and does not match Hq organization id!")
    }

  }
}

// store.subscribe(appStateListener);
// store.subscribe(hqStateListener);
store.subscribe(listener)

export default store;