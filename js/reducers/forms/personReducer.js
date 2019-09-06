/* eslint-disable camelcase */
import * as actions from "../../actions/forms/types";

const initialState = {};

const reducer = ( state = initialState, action ) => {
  switch( action.type ) {

    case actions.FORMS_PERSON_UPDATE_FIELD:
      return {
        ...state,
        ...action.payload,
      };

    case actions.FORMS_PERSON_SET_FIELDS:
      return {
        ...state,
        ...action.payload.PERSON,
      };

    case actions.FORMS_PERSON_RESET:
      return {
        ...initialState,
      };

    case actions.FORMS_RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;