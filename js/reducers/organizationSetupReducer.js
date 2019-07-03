import * as actions from "../actions/organizationSetup/types";




const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.ORGANIZATION_SETUP_SET_BUSINESS_DETAILS: {
      return {
        ...state,
        business_details: {...action.payload.business_details},
      };
    }

    case actions.ORGANIZATION_SETUP_SET_LEGAL_REPRESENTATIVE:
      return {
        ...state,
        legal_representative: {...action.payload.legal_representative},
      };

    case actions.ORGANIZATION_SETUP_SET_PAYMENT_METHODS:
      return {
        ...state,
        payment_methods: {...action.payload.payment_methods},
      };

    case actions.ORGANIZATION_SETUP_RESET:
      return {...initialState};

    default:
      return state;
  }
};

export default reducer;