import * as actionTypes from './types';
import API from '../../API/Api';

/**
 * Used for dropdowns and other selection forms throughout the app.
 *
 * These resources get formatted and wrapped in an object nested under
 * the key "data", much like how data is returned from the API.
 * However we leave it wrapped when loaded into state due to some issues
 * with redux loading mutated arrays.
 */

// Synchronous Actions
export const setLoading = () => ( {
  type: actionTypes.UI_SET_LOADING,
} );
export const unsetLoading = () => ( {
  type: actionTypes.UI_UNSET_LOADING,
} );

export const setUSStates = us_states => ( {
  type: actionTypes.UI_SET_US_STATES,
  payload: {us_states},
} );

export const setSportTypes = sport_types => ( {
  type: actionTypes.UI_SET_SPORT_TYPES,
  payload: {sport_types},
} );

export const setRelationshipTypes = relationship_types => ( {
  type: actionTypes.UI_SET_RELATIONSHIP_TYPES,
  payload: {relationship_types},
} );

export const setOrganizationTypes = organization_types => ( {
  type: actionTypes.UI_SET_ORGANIZATION_TYPES,
  payload: {organization_types},
} );

export const setProgramTypes = program_types => ( {
  type: actionTypes.UI_SET_PROGRAM_TYPES,
  payload: {program_types},
} );

export const setGoverningBodies = governing_bodies => ( {
  type: actionTypes.UI_SET_GOVERNING_BODIES,
  payload: {governing_bodies},
} );

export const setDocumentTypes = document_types => ( {
  type: actionTypes.UI_SET_DOCUMENT_TYPES,
  payload: {document_types},
} );

export const setEmailTypes = email_types => ( {
  type: actionTypes.UI_SET_EMAIL_TYPES,
  payload: {email_types},
} );

export const setFormFieldTypes = form_field_types => ( {
  type: actionTypes.UI_SET_FORM_FIELD_TYPES,
  payload: {form_field_types},
} );

export const setAffiliates = affiliates => ( {
  type: actionTypes.UI_SET_AFFILIATES,
  payload: {affiliates},
} );


// Asynchronus Action Creators

// export const fetchInitialUIData = () =>
//   async ( dispatch, getState ) => {

//     dispatch( startFetch() );

//     const promises = [
//       dispatch( setUSStates( await API.ui.getUSStates() ) ),
//       dispatch( setSportTypes( await API.ui.getSportTypes() ) ),
//       dispatch( setProgramTypes( await API.ui.getProgramTypes() ) ),
//       dispatch( setRelationshipTypes( await API.ui.getRelationshipTypes() ))
//     ];

//     return Promise.all(promises)
//       .then( () => {
//         return dispatch( stopFetch() );
//       })
//       .catch( error => {
//         throw error
//         }
//       )
//   };


export const fetchUSStates = () =>
  async dispatch => dispatch(
    setUSStates( await API.ui.getUSStates )
  );

export const fetchSportTypes = () =>
  async dispatch => dispatch(
    setSportTypes( await API.ui.getSportTypes() )
  );

export const fetchRelationshipTypes = () =>
  async dispatch => dispatch(
    setRelationshipTypes( await API.ui.getRelationshipTypes() )
  );

export const fetchOrganizationTypes = () =>
  async dispatch => dispatch(
    setOrganizationTypes( await API.ui.getOrganizationTypes() )
  );

export const fetchProgramTypes = () =>
  async dispatch => dispatch(
    setProgramTypes( await API.ui.getProgramTypes() )
  );

export const fetchGoverningBodies = () =>
  async dispatch => dispatch(
    setGoverningBodies( await API.ui.getGoverningBodies() )
  );
export const fetchDocumentTypes = () =>
  async dispatch => dispatch(
    setDocumentTypes( await API.ui.getDocumentTypes() )
  );
export const fetchEmailTypes = () =>
  async dispatch => dispatch(
    setEmailTypes( await API.ui.getEmailTypes() )
  );
export const fetchFormFieldTypes = () =>
  async dispatch => dispatch(
    setFormFieldTypes( await API.ui.getFormFieldTypes() )
  );
export const fetchAffiliates = () =>
  async dispatch => dispatch(
    setAffiliates( await API.ui.getAffiliationTypes() )
  );

