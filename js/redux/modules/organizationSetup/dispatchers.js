import API from "../../../api/Api";
import {
  isEmpty,
  getPropertiesByPrefix,
  filterNullProperties,
  normalizeDataFromArray,
} from "../../../helpers/object";
import * as log from "../../../helpers/log";
import { formatUIData } from "../../../helpers/api";
import {
  // checkIfValidContext,
  // matchIds,
  separateData,
  updateAddress
} from "./helpers";
import * as actions from "./actions";

//* Constants
const ADDRESS_PREFIX = "address_";
const BUSINESS_DETAILS = "businessDetails";
const LEGAL_REPRESENTATIVE = "legalRepresentative";
/* eslint-disable camelcase */

export const init = () =>
  async dispatch => {

    const loadDetails = API.organizationSetup.getDetails()
      .then( businessDetails => {
        return dispatch( actions.setBusinessDetails( businessDetails ) );
      } ).catch( log.dev );

    const loadLegalRep = API.organizationSetup.getLegalRep()
      .then( legalRep => {
        if ( legalRep ) {
          return dispatch( actions.setLegalRepresentative( legalRep ) );
        }
      } ).catch( log.dev );

    const loadBankAccounts = API.organizationSetup.getBankAccounts()
      .then( bankAccountData => {
        const [ bankAccounts, bankAccountIds ] = normalizeDataFromArray( bankAccountData );
        return dispatch( actions.setBankAccounts( { bankAccounts, bankAccountIds } ) );
      } ).catch( log.dev );

    const loadStaff = API.organizationSetup.getStaff()
      .then( staffMembers => {
        const staff = {};
        const staffIds = [];

        staffMembers.forEach( member => {
          staff[ member.id ] = { ...member };
          staffIds.push( member.id );
        } );

        return dispatch( actions.setStaff( { staff, staffIds } ) );
      } ).catch( log.dev );

    const loadStaffRoles = API.organizationSetup.getStaffRoles()
      .then( roles => formatUIData( { data: roles } ) )
      .then( ( { data } ) => data.map( item => ( { ...item, text: item.text.title } ) ) )
      .then( data => {
        return dispatch( actions.setRolesDropdownData( data ) );
      } )
      .catch( log.dev );

    await Promise.all( [
      loadDetails,
      loadLegalRep,
      loadBankAccounts,
      loadStaff,
      loadStaffRoles
    ] );
    return;
  };

export const updateField = ( { section, fieldName, value } ) =>
  dispatch => {
    const payload = {
      fieldName,
      value,
    };

    return dispatch( actions.updateFieldValue( { section, payload } ) );
  };

export const createAndAttachAddress = ( data, addressFields ) => {
  if ( addressFields ) {
    const payload = { data: { ...addressFields } };
    return API.createAddress( payload )
      .then( addressObj => {
        data.address_id = addressObj.id;
        return data;
      } );
  }
  return data;
};

export const getStaff = () =>
  dispatch => API.organizationSetup.getStaff()
    .then( normalizeDataFromArray )
    .then( ( [ staff, staffIds ] ) => {
      dispatch( actions.setStaff( { staff, staffIds } ) );
    } );


export const getStaffRoles = () =>
  dispatch => API.organizationSetup.getStaffRoles()
    .then( roles => formatUIData( { data: roles } ) )
    .then( ( { data } ) => {
      return dispatch( actions.setRolesDropdownData( data ) );
    } );

export const getUsersByEmail = email =>
  dispatch => API.organizationSetup.getUsersByEmail( email )
    .then( normalizeDataFromArray )
    .then( ( [ users, userIds ] ) => {
      dispatch( actions.setUsers( { users, userIds } ) );
    } );


export const resetState = () =>
  dispatch => dispatch( actions.reset() );

export const saveNewStaffMember = () =>
  ( dispatch, getState ) => {
    const { personId, roleId } = getState().organizationSetup.newStaff;
    return API.organizationSetup
      .saveNewStaffMember( { personId, roleId } );
  };

export const saveNewOrganization = () =>
  async ( dispatch, getState ) => {
    const { businessDetails } = getState().organizationSetup;
    const fields = filterNullProperties( businessDetails );
    let [ addressFields, detailsData ] = getPropertiesByPrefix( fields, ADDRESS_PREFIX );

    detailsData = await createAndAttachAddress( detailsData, addressFields );

    const payload = { data: { ...detailsData } };
    try {
      const organization = await API.createOrganization( payload );
      await API.setOrganizationContext( organization.id );

    } catch ( error ) {
      log.error( error );
      throw error;
    }
  };

export const saveNewLegalRepresentative = () =>
  async ( dispatch, getState ) => {
    const { legalRepresentative } = getState().organizationSetup;
    const fields = filterNullProperties( legalRepresentative );
    let [ personData, addressFields ] = getPropertiesByPrefix( fields, ADDRESS_PREFIX );

    personData = await createAndAttachAddress( personData, addressFields );

    const payload = { data: { ...personData } };
    try {
      const person = await API.createPerson( payload );
      await API.organizationSetup.attachLegalRepresentative( person.id );

    } catch ( error ) {
      log.error( error );
      throw error;
    }
  };

export const saveNewPaymentMethod = data =>
  async ( dispatch, getState ) => {
    const state = getState();
    const { paymentMethods } = state.organizationSetup;

    try {
      const response = await API.hq.savePaymentMethod( data );
      paymentMethods.push( response );
      // return dispatch(setPaymentMethods(payment_methods));

    } catch ( error ) {
      log.error( error );
      return {
        message: "Error occurred while attempting to save new payment method.",
        error,
      };
    }
  };

export const setNewStaffPersonId = id =>
  dispatch => dispatch( actions.setPersonId( id ) );

export const setNewStaffRoleId = id =>
  dispatch => dispatch( actions.setRoleId( id ) );

export const updateCurrentStation = currentStation =>
  dispatch => dispatch( actions.setCurrentStation( currentStation ) );

export const updateBusinessDetails = () =>
  async ( dispatch, getState ) => {
    const [ id, oldData, changedData ] = await separateData( getState(), BUSINESS_DETAILS );
    const [ addressFields, detailsData ] = getPropertiesByPrefix( changedData, ADDRESS_PREFIX );
    const resetFn = () => dispatch( actions.setBusinessDetails( oldData ) );
    updateAddress( oldData.address_id, addressFields, resetFn );

    if ( !isEmpty( detailsData ) ) {
      const payload = { data: { ...detailsData } };
      return API.hq.updateBusinessDetails( id, payload )
        .catch( error => {
          dispatch( actions.setBusinessDetails( oldData ) );
          throw error;
        } );
    }
  };

export const updateLegalRepresentative = () =>
  async ( dispatch, getState ) => {
    const [ id, oldData, changedData ] = await separateData( getState(), LEGAL_REPRESENTATIVE );
    const [ repData, addressFields ] = getPropertiesByPrefix( changedData, ADDRESS_PREFIX );
    const resetFn = () => dispatch( actions.setLegalRepresentative( oldData ) );
    updateAddress( oldData.address_id, addressFields, resetFn );

    if ( !isEmpty( repData ) ) {
      const payload = { data: { ...repData } };
      return API.updatePerson( id, payload )
        .catch( error => {
          dispatch( actions.setLegalRepresentative( oldData ) );
          throw error;
        } );
    }
  };

export const uploadLogoImage = file =>
  async () => {
    const fieldName = "logo_image_path";
    const payload = packageFileForUpload( { file, fieldName } );
    const newLogoPath = ( await API.organizationSetup.uploadFile( payload ) )[ 0 ];
    return updateLogoImagePath( newLogoPath );
  };

export const uploadIdentificationPhoto = ( { file, isFront } ) =>
  async ( dispatch, getState ) => {
    const orgId = getState().hq.root.organization_data.id;
    const fieldName = isFront
      ? "identification_front_image"
      : "identification_back_image";
    const payload = packageFileForUpload( { file, fieldName } );
    const path = ( await API.organizationSetup.uploadFile( payload ) )[ 0 ];
    return updateIdentificationPhoto( { path, fieldName, orgId } );
  };

const updateIdentificationPhoto = ( { path, fieldName, orgId } ) => {
  fieldName += "_path";
  const payload = {
    data: { [ fieldName ]: path }
  };
  return API.organizationSetup.updatePUT( { id: orgId, payload } );
}

const updateLogoImagePath = path => {
  const payload = {
    data: { logo_image_path: path }
  };
  return API.organizationSetup.updatePUT( payload );
};

export const uploadPhotoId = ( { formData, isFront } ) =>
  async () => {
    const imagePath = ( await API.organizationSetup.uploadFile( formData ) )[ 0 ];
    const payload = isFront
      ? { data: { identification_front_image_path: imagePath } }
      : { data: { identification_back_image_path: imagePath } };
    return API.hq.updateProofOfIdImagePath( payload );
  };


//! Move function below to a helper file

const packageFileForUpload = ( { file, fieldName } ) => {
  const formData = new FormData();
  formData.append( "file_field_name", fieldName );
  formData.append( fieldName, file );
  return formData;
};
