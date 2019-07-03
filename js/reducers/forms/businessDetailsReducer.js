import * as actions from "../../actions/forms/types";

const initialState = {
  id: null,
  name: null,
  short_name: null,
  description: null,
  type: null,
  type_id: null,
  sport_id: null,
  website_url: null,
  email: null,
  phone: null,
  address_id: null,
  address_street1: null,
  address_street2: null,
  address_city: null,
  address_state_code: null,
  address_zip: null,
  address_country: null,
  tax_id: null,
  logo_image_path: null,
  notes: null,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {

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