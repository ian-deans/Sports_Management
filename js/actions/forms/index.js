import * as actions from "./types";
import { dev } from "../../helpers/log";

const BUSINESS_DETAILS = "BUSINESS_DETAILS";
const LEGAL_REPRESENTATIVE = "LEGAL_REPRESENTATIVE";


const updateBusinessDetails = payload => ( {
  type: actions.FORMS_BUSINESS_DETAILS_UPDATE_FIELD,
  payload,
} );

const updateLegalRepresentative = payload => ( {
  type: actions.FORMS_LEGAL_REPRESENTATIVE_UPDATE_FIELD,
  payload,
} );

// const updatePerson = payload => ( {
//   type: actions.FORMS_PERSON_UPDATE_FIELD,
//   payload,
// } );

const resetAllFormStates = () => ( {
  type: actions.FORMS_RESET,
} );


export const updateField = ( formName, ...payload ) =>
  ( dispatch ) => {
    let actionCreator;

    switch ( formName ) {
      case BUSINESS_DETAILS:
        actionCreator = updateBusinessDetails;
        break;

      case LEGAL_REPRESENTATIVE:
        actionCreator = updateLegalRepresentative;
        break;

        // case PERSON:
        //   actionCreator = updatePerson;
        //   break;

      default:
        dev( "Form Actions: updateField: No match found for form name provided.", formName );
    }

    if ( actionCreator ) {
      dispatch( actionCreator( payload ) );
    }
  };

export const resetAllForms = () =>
  dispatch => dispatch( resetAllFormStates() );