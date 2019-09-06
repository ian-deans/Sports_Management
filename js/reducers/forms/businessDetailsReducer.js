import * as actions from "../../actions/forms/types";

const reducer = ( state = {}, action ) => {
  switch( action.type ) {

    case actions.FORMS_BUSINESS_DETAILS_UPDATE_FIELD:
      return {
        ...state,
        ...action.payload,
      };

    case actions.FORMS_BUSINESS_DETAILS_SET_FIELDS:
      return {
        ...state,
        ...action.payload.business_details,
      };

    case actions.FORMS_BUSINESS_DETAILS_RESET:
      return {};

    case actions.FORMS_RESET:
      return {};

    default:
      return state;
  }
};

export default reducer;