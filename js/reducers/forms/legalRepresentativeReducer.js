import * as actions from "../../actions/forms/types";

const reducer = ( state = {}, action ) => {
  switch( action.type ) {

    case actions.FORMS_LEGAL_REPRESENTATIVE_UPDATE_FIELD:
      return {
        ...state,
        ...action.payload,
      };

    case actions.FORMS_LEGAL_REPRESENTATIVE_SET_FIELDS:
      return {
        ...state,
        ...action.payload.legal_representative,
      };

    case actions.FORMS_LEGAL_REPRESENTATIVE_RESET:
      return {};

    case actions.FORMS_RESET:
      return {};

    default:
      return state;
  }
};

export default reducer;