import * as actions from "../../actions/forms/types";

const initialState = {
  id: null,
  first_name: null,
  last_name: null,
  full_name: null,
  classification: null,
  gender: null,
  birthdate: null,
  email: null,
  mobile_number: null,
  tax_id: null,
  address_id: null,
  address_street1: null,
  address_street2: null,
  address_city: null,
  address_state_code: null,
  address_zip: null,
  address_country_code: null,
  profile_image_path: null,
  notes: null,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {

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
      return {
        ...initialState,
      };

    case actions.FORMS_RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  };
};

export default reducer;