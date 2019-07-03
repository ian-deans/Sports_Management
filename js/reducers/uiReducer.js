import * as actionTypes from '../actions/ui/types';

const initialState = {
  usStates: undefined,
  sportTypes: undefined,
  relationshipTypes: undefined,
  organizationTypes: undefined,
  programTypes: undefined,
  governingBodies: undefined,
  documentTypes: undefined,
  emailTypes: undefined,
  formFieldTypes: undefined,
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.UI_SET_LOADING:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.UI_UNSET_LOADING:
      return {
        ...state,
        isFetching: false,
      };


    case actionTypes.UI_SET_US_STATES:
      return {
        ...state,
        usStates: action.payload,
      };

    case actionTypes.UI_SET_SPORT_TYPES:
      return {
        ...state,
        sportTypes: action.payload,
      };

    case actionTypes.UI_SET_RELATIONSHIP_TYPES:
      return {
        ...state,
        relationshipTypes: action.payload,
      };

    case actionTypes.UI_SET_ORGANIZATION_TYPES:
      return {
        ...state,
        organizationTypes: action.payload,
      };

    case actionTypes.UI_SET_PROGRAM_TYPES:
      return {
        ...state,
        programTypes: action.payload,
      };

    case actionTypes.UI_SET_GOVERNING_BODIES:
      return {
        ...state,
        governingBodies: action.payload,
      };

    case actionTypes.UI_SET_DOCUMENT_TYPES:
      return {
        ...state,
        documentTypes: action.payload,
      };

    case actionTypes.UI_SET_EMAIL_TYPES:
      return {
        ...state,
        emailTypes: action.payload,
      };

    case actionTypes.UI_SET_FORM_FIELD_TYPES:
      return {
        ...state,
        formFieldTypes: action.payload,
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;