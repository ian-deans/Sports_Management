import * as actionTypes from "../../actions/hq/types";

const initialState = {
  info: {},
  members: [],
  contacts: [],
  documents: [],
  payment_methods: [],
  orders: [],
  cached: {},
  selection: [],
};

const reducer = (state = initialState, action) => {
  switch(action.type) {

    case actionTypes.HQ_HOUSEHOLDS_SET_CURRENT_DATA:
      return {
        ...state,
        ...action.payload.currentData,
      };

    case actionTypes.HQ_HOUSEHOLDS_SET_HOUSEHOLD_SELECTION:
      return {
        ...state,
        selection: action.payload.selection,
      };
    
    default:
      return state;
  };
};

export default reducer;