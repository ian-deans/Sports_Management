import * as actions from "./types";

const BUSINESS_DETAILS = "BUSINESS_DETAILS";
const LEGAL_REPRESENTATIVE = "LEGAL_REPRESENTATIVE";


const updateBusinessDetails = payload => ({
  type: actions.FORMS_BUSINESS_DETAILS_UPDATE_FIELD,
  payload,
});

const updateLegalRepresentative = payload => ({
  type: actions.FORMS_LEGAL_REPRESENTATIVE_UPDATE_FIELD,
  payload,
});

const updatePerson = payload => ({
  type: actions.FORMS_PERSON_UPDATE_FIELD,
  payload,
});

const resetAllFormStates = () => ({
  type: actions.FORMS_RESET,
})




export const updateField = (formName, fieldName, value) =>
  (dispatch, getState) => {

    const payload = {[fieldName]: value};
    let actionCreator;

    switch(formName) {
      case BUSINESS_DETAILS:
        actionCreator = updateBusinessDetails;
        break;

      case LEGAL_REPRESENTATIVE:
        actionCreator = updateLegalRepresentative;
        break;
      
      case PERSON:
        actionCreator = updatePerson;
        break;

      default:
        console.warn("Form Actions: updateField: No match found for form name provided.", formName);
    };

    if (actionCreator) {
      dispatch(actionCreator(payload));
    };
};

export const resetAllForms = () =>
  async dispatch => dispatch(resetAllFormStates());