import * as actionTypes from '../actions/app/types';

const initialState = {
  loading: false,
  user: null,
  user_name: null,
  user_profile_image_path: null,
  organization_name: "Cinch Sports",
  organization_logo_image_path: null,
  household_context: null,
  organization_context: null,
  program_context: null,
};


const reducer = (state = initialState, action) => {
  switch(action.type) {
    
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    
    case actionTypes.UNSET_LOADING:
      return {
        ...state,
        loading: false,
      };
    
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        user_name: action.payload.user.name,
        user_profile_image_path: action.payload.user.person.profile_image_path,
        loading: true,
      }
    
    case actionTypes.SET_HOUSEHOLD_CONTEXT:
      return {
        ...state,
        household_context: action.payload.household_context,
      };

    case actionTypes.SET_ORGANIZATION_CONTEXT:
      return {
        ...state,
        organization_context: action.payload.organization_context,
      };

    case actionTypes.SET_PROGRAM_CONTEXT:
      return {
        ...state,
        program_context: action.payload.program_context,
      };

    case actionTypes.SET_HQ:
      return {
        ...state,
        organization_name: action.payload.organization_data.name,
        organization_logo_image_path: action.payload.organization_data.logo_image_path
      };

    
    default:
      return state;
  };
};

export default reducer;