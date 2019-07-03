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

export const setUSStates = states => ( {
  type: actionTypes.UI_SET_US_STATES,
  payload: states
} );

export const setSportTypes = sportTypes => ( {
  type: actionTypes.UI_SET_SPORT_TYPES,
  payload: sportTypes,
} );

export const setRelationshipTypes = relationshipTypes => ( {
  type: actionTypes.UI_SET_RELATIONSHIP_TYPES,
  payload: relationshipTypes,
} );

export const setOrganizationTypes = organizationTypes => ( {
  type: actionTypes.UI_SET_ORGANIZATION_TYPES,
  payload: organizationTypes,
} );

export const setProgramTypes = programTypes => ( {
  type: actionTypes.UI_SET_PROGRAM_TYPES,
  payload: programTypes,
} );

export const setGoverningBodies = governingBodies => ( {
  type: actionTypes.UI_SET_GOVERNING_BODIES,
  payload: governingBodies,
} );

export const setDocumentTypes = documentTypes => ( {
  type: actionTypes.UI_SET_DOCUMENT_TYPES,
  payload: documentTypes,
} );

export const setEmailTypes = emailTypes => ( {
  type: actionTypes.UI_SET_EMAIL_TYPES,
  payload: emailTypes,
} );

export const setFormFieldTypes = formFieldTypes => ( {
  type: actionTypes.UI_SET_FORM_FIELD_TYPES,
  payload: formFieldTypes,
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

