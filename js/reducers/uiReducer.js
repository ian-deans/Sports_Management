import * as actionTypes from '../actions/ui/types';

const initialState = {
  us_states: undefined,
  sport_types: undefined,
  relationship_types: undefined,
  organization_types: undefined,
  program_types: undefined,
  governing_bodies: undefined,
  document_types: undefined,
  email_types: undefined,
  formFieldTypes: undefined,
  affiliates: undefined,
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
        us_states: action.payload.us_states,
      };

    case actionTypes.UI_SET_SPORT_TYPES:
      return {
        ...state,
        sport_types: action.payload.sport_types,
      };

    case actionTypes.UI_SET_RELATIONSHIP_TYPES:
      return {
        ...state,
        relationship_types: action.payload.relationship_types,
      };

    case actionTypes.UI_SET_ORGANIZATION_TYPES:
      return {
        ...state,
        organization_types: action.payload.organization_types,
      };

    case actionTypes.UI_SET_PROGRAM_TYPES:
      return {
        ...state,
        program_types: action.payload.program_types,
      };

    case actionTypes.UI_SET_GOVERNING_BODIES:
      return {
        ...state,
        governing_bodies: action.payload.governing_bodies,
      };

    case actionTypes.UI_SET_DOCUMENT_TYPES:
      return {
        ...state,
        document_types: action.payload.document_types,
      };

    case actionTypes.UI_SET_EMAIL_TYPES:
      return {
        ...state,
        email_types: action.payload.email_types,
      };

    case actionTypes.UI_SET_FORM_FIELD_TYPES:
      return {
        ...state,
        form_field_types: action.payload.form_field_types,
      };

    case actionTypes.UI_SET_AFFILIATES:
      return {
        ...state,
        affiliates: action.payload.affiliates,
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;