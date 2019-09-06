/* eslint-disable camelcase */
import * as actionTypes from "./types";
import API from "../../api/Api";
import { dateFromTimestamp } from "../../helpers/date";
import { error } from "../../helpers/log";

//^ ********* ACTIONS *********
const setHouseholdMembers = household_members => ( {
  type: actionTypes.SET_HOUSEHOLD_MEMBERS,
  payload: { household_members },
} );

const setProgramSearchResults = program_search_results => ( {
  type: actionTypes.SET_PROGRAM_SEARCH_RESULTS,
  payload: { program_search_results },
} );

const unsetProgramSearchResults = () => ( {
  type: actionTypes.UNSET_PROGRAM_SEARCH_RESULTS,
} );

const setProgram = program_details => ( {
  type: actionTypes.SET_PROGRAM_DETAILS,
  payload: { program_details },
} );

const setPaymentMethods = payment_methods => ( {
  type: actionTypes.SET_PAYMENT_METHODS,
  payload: { payment_methods },
} );


//^ ********* ACTION DISPATCHERS **********

export const programSearch = options =>
  async dispatch => {
    try {
      const rawPrograms = await API.account.searchForPrograms( options );
      const programs = rawPrograms.map( program => {
        let { organization, ...fields } = program;
        const { name: org_name, address_city: location, logo_image_path: logo } = organization.data;

        fields = formatDates( fields );

        return { org_name, location, logo, ...fields };
      } );
      dispatch(
        setProgramSearchResults( programs ),
      );
    } catch ( err ) {
      dispatch(
        setProgramSearchResults( [] ),
      );
      error( err );
      throw err;
    }
  };


export const clearSearchResults = () =>
  dispatch => dispatch(
    unsetProgramSearchResults(),
  );

export const getProgramById = id =>
  async dispatch => dispatch(
    // TODO: Reconstruct data as needed here.
    setProgram(
      await API.account.getProgram( id ),
    ),
  );

export const createNewHouseholdMember = formData =>
  async ( dispatch, getState ) => {
    // TODO: dispatch setLoading
    const state = getState();
    let config = {};

    try {
      config = await _newMemberConfig( { ...formData, config, state } );
    } catch ( err ) {
      error( err );
      throw err;
    }


    try {
      await _createNewHouseholdMember( config );
    } catch ( err ) {
      error( err );
      throw new Error( { CreateNewHouseholdMember: error } );
    }

    return dispatch(
      setHouseholdMembers( await API.account.getHouseholdMembers() ),
    );
  };

export const saveNewPaymentMethod = data =>
  async ( dispatch, getState ) => {
    const state = getState();
    const { payment_methods } = state.account;

    try {
      const response = await API.account.savePaymentMethod( data );
      payment_methods.push( response );
      return dispatch( setPaymentMethods( payment_methods ) );

    } catch ( err ) {
      error( err );
      return {
        message: "Error occurred while attempting to save new payment method.",
        error,
      };
    }
  };


//^ ********** HELPER FUNCTIONS **********

async function _createNewHouseholdMember( { personalData, relationships } ) {
  // Create new Person entity
  const newPerson = ( await API.createPerson( {
    data: personalData,
  } ) );

  // Attach new Person to the current Household
  await API.account.attachPersonToHousehold( newPerson.id );

  const addressIdNotFoundOnNewPerson = !newPerson.address_id;

  if ( addressIdNotFoundOnNewPerson ) {
    error( {
      "No address found on new Person object": newPerson,
    } );
    await API.people.attachAddress( {
      person_id: newPerson.id,
      address_id: newPerson.address_id,
    } );
  }

  if ( relationships ) {
    await Promise.all( relationships.map( relationship =>
      API.account.createRelationship( {
        target_id: newPerson.id,
        member_id: relationship.member,
        relation_id: relationship.relation,
        access_financials: relationship.financials,
        receive_communications: relationship.communications,
      } ),
    ) );
  }
}

async function _newMemberConfig( {
  state,
  config,
  personalData,
  addressData,
  relationships,
  // loginData, //!FIXME: look into unused variable
} ) {
  const personalDataHasBlanks = Object.values( personalData ).includes( "" );
  if ( personalDataHasBlanks ) {
    throw new Error( "Personal Info contained blank fields." );
  }

  config.personalData = { ...personalData };

  if ( addressData.sameAddress ) {
    config.personalData.address_id = state.account.root.household_address.id;
  } else {
    config.personalData.address_id = ( await API.account.createHouseholdAddress( {
      data: {
        ...addressData,
      },
    } ) ).id;
  }

  const validRelationshipConfigurations = relationships.filter(
    relationship => relationship.member !== "" && relationship.relation !== "",
  );

  if ( validRelationshipConfigurations.length > 0 ) {
    config.relationships = validRelationshipConfigurations;
  }

  return config;
}


function formatDates( fields ) {
  let startDate = fields.start_date;
  let endDate = fields.end_date;

  startDate = dateFromTimestamp( startDate ).format( "M-D-YY" );
  endDate = dateFromTimestamp( endDate ).format( "M-D-YY" );

  fields.start_date = startDate;
  fields.end_date = endDate;
  return fields;
}

