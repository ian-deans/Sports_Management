/* eslint-disable camelcase */
import * as actionTypes from "./types";
import { setUSStates, setSportTypes, setProgramTypes, setRelationshipTypes, setAffiliates } from "../ui";
import API from "../../api/Api";
import { dev, error } from "../../helpers/log";


const resetApp = () => ( {
  type: actionTypes.RESET_APP,
} );

const unsetLoading = () => ( {
  type: actionTypes.UNSET_LOADING,
} );

const setUser = user => ( {
  type: actionTypes.SET_USER,
  payload: { user },
} );

const setAccount = accountData => ( {
  type: actionTypes.SET_ACCOUNT,
  payload: accountData,
} );

const setHq = hqData => ( {
  type: actionTypes.SET_HQ,
  payload: hqData,
} );

const setHouseholdContext = household_context => ( {
  type: actionTypes.SET_HOUSEHOLD_CONTEXT,
  payload: { household_context },
} );

const setOrganizationContext = organization_context => ( {
  type: actionTypes.SET_ORGANIZATION_CONTEXT,
  payload: { organization_context },
} );

const setProgramContext = program_context => ( {
  type: actionTypes.SET_PROGRAM_CONTEXT,
  payload: { program_context },
} );


export const loadUIData = () =>
  async dispatch => {
    const promises = [
      API.ui.getUSStates(),
      API.ui.getSportTypes(),
      API.ui.getRelationshipTypes(),
      API.ui.getProgramTypes(),
      API.ui.getAffiliationTypes()
    ];

    const [ usStates, sportTypes, relationshipTypes, programTypes, affiliates ] = await Promise.all( promises );

    dispatch( setUSStates( usStates.data ) );
    dispatch( setSportTypes( sportTypes.data ) );
    dispatch( setRelationshipTypes( relationshipTypes.data ) );
    dispatch( setProgramTypes( programTypes.data ) );
    dispatch( setAffiliates( affiliates.data ) );
  };

export const logout = () =>
  dispatch => {
    dispatch( resetApp() );
  };


export const loadUser = () =>
  dispatch => API.init.user()
    .then( user => _loadUser( user, dispatch ) )
    .catch( error );

export const updateOrganizationContext = () =>
  async dispatch => {
    const context = await API.getContext.organization();
    dev( "new context :: ", context );
    dispatch( setOrganizationContext( context ) );
  };


function _loadUser( user, dispatch ) {
  dispatch( setUser( _processUser( user ) ) );
  _processContexts( user.contexts.data, dispatch );
}

function _processUser( userObj ) {
  return {
    id: userObj.id,
    person_id: userObj.person_id,
    email: userObj.email,
    name: userObj.name,
    last_login: userObj.last_login,
    person: userObj.person.data,
  };
}


async function _processContexts( contexts, dispatch ) {
  await Promise.all( contexts.map( c => _setContextByType( c, dispatch ) ) );
  dispatch( unsetLoading() );
}


function _setContextByType( c, dispatch ) {
  if ( c ) {
    const cType = c.context_type;
    if ( cType === "household" ) {
      return _initAccount( c, dispatch );
    } else if ( cType === "organization" ) {
      return _initHq( c, dispatch );
    } else if ( cType === "program" ) {
      //? What type of user will have a default program context? 
      //? players possibly...
      dispatch( setProgramContext( c ) );
    }
  }
}

function _initAccount( context, dispatch ) {
  dispatch( setHouseholdContext( context ) );

  // INIT ACCOUNT
  return API.init.account()
    .then( result => _processAccountData( result ) )
    .then( accountData => dispatch( setAccount( accountData ) ) )
    .catch( error );
}

function _processAccountData( data ) {
  const accountData = {
    household_data: {
      id: data.id,
      name: data.name,
      status: data.status,
      notes: data.notes,
    },
  };

  if ( data.address ) {
    accountData.household_address = data.address.data;
  }

  if ( data.members ) {
    accountData.household_members = data.members.data;
  }

  if ( data.payment_methods ) {
    accountData.payment_methods = data.payment_methods.data;
  }

  return accountData;
}

function _initHq( context, dispatch ) {
  dispatch( setOrganizationContext( context ) );
  return API.init.hq()
    .then( result => _processHqData( result ) )
    .then( hqData => dispatch( setHq( hqData ) ) )
    .catch( error );
}

function _processHqData( data ) {
  //! FIXME! Line below causing a bug when no programs are attached to organization
  // const { programs: { data: programs }, ...organization_data } = data;
  return { organization_data: data, programs: [] };
  // return { organization_data, programs };
}