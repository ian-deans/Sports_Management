import { getChangedProperties } from "../../../helpers/object";
import * as log from "../../../helpers/log";
import API from "../../../api/Api";

const BUSINESS_DETAILS = "businessDetails";
const LEGAL_REPRESENTATIVE = "legalRepresentative";

export function checkIfValidContext( context ) {
  if ( !context ) {
    //? return begin new organization setup function?
    log.dev( "No organization context found." );
    throw new Error( "No Organization context found." );
  }
}

export function matchIds( first, second ) {
  const match = first === second;
  if ( !match ) {
    log.dev( "Mismatched IDs found." );
  }
}

export function separateData( state, formName ) {
  const { id, ...newData } = state.organizationSetup[ formName ];
  const apiFn = assignApiFunction( formName );
  return apiFn()
    .then( prevData => {
      const [ changedData, unchangedData ] = getChangedProperties( { newData, prevData } );
      // TODO: Do something about this unchangedData. Do we even need it?
      log.dev( unchangedData );
      return [ id, prevData, changedData ];
    } )
    .catch( log.error );
}

function assignApiFunction( formName ) {
  switch ( formName ) {
    case BUSINESS_DETAILS: {
      return API.hq.getOrganizationData;
    }

    case LEGAL_REPRESENTATIVE: {
      return API.getPerson;
    }

    default: {
      return null;
    }
  }
}

export function updateAddress( addressId, addressFields, resetFn ) {
  if ( addressFields ) {
    log.dev( "Address data found, updating address with id ", addressId );
    const payload = { data: { ...addressFields } };
    API.updateAddress( { addressId, payload } )
      .catch( error => {
        log.dev( error );
        resetFn();
      } );
  }
}

export function normalizeDataFromArray( arrayOfData ) {
  const data = {};
  const ids = [];
  arrayOfData.forEach( item => {
    data[ item.id ] = { ...item };
    ids.push( item.id );
  } );
  return [ data, ids ];
}