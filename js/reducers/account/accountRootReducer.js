import * as appActions from '../../actions/app/types'
import * as accountActions from '../../actions/account/types';

const initialState = {
  household_data: null,
  household_address: null,
  household_members: [],
  payment_methods: [],
  payment_history: null,
  documents: null,
  program_search_results: [],
  program_details: null,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {

    case appActions.SET_ACCOUNT:
      return {
        ...state,
        household_data: action.payload.household_data,
        household_address: action.payload.household_address,
        household_members: action.payload.household_members,
        payment_methods: action.payload.payment_methods,
      };
    
    case accountActions.SET_HOUSEHOLD_MEMBERS:
      return {
        ...state,
        household_members: action.payload.household_members,
      };
    
    case accountActions.SET_PROGRAM_DETAILS:
      return {
        ...state,
        program_details: action.payload.program_details,
      };
    
    case accountActions.UNSET_PROGRAM_DETAILS:
      return {
        ...state,
        program_details: null,
      };

    case accountActions.SET_PROGRAM_SEARCH_RESULTS:
      return {
        ...state,
        program_search_results: action.payload.program_search_results,
      };

    case accountActions.UNSET_PROGRAM_SEARCH_RESULTS:
      return{
        ...state,
        program_search_results: [],
      };
    
    case accountActions.SET_PAYMENT_METHODS:
      return {
        ...state,
        payment_methods: action.payload.payment_methods,
      };

    default:
      return state;

  };
};

export default reducer;