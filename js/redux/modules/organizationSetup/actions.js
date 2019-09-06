import * as types from "./types";

//* Action Creators
export const setBankAccounts = payload => ( {
  type: types.SET_BANK_ACCOUNTS,
  payload,
} );

export const setBusinessDetails = businessDetails => ( {
  type: types.SET_BUSINESS_DETAILS,
  payload: { businessDetails },
} );

export const setLegalRepresentative = legalRepresentative => ( {
  type: types.SET_LEGAL_REPRESENTATIVE,
  payload: { legalRepresentative },
} );

export const setStaff = payload => ( {
  type: types.SET_STAFF,
  payload,
} );

export const setUsers = payload => ( {
  type: types.SET_USERS,
  payload,
} );

export const setPersonId = personId => ( {
  type: types.SET_PERSON_ID,
  payload: { personId },
} );

export const setRoleId = roleId => ( {
  type: types.SET_ROLE_ID,
  payload: { roleId },
} );

export const updateFieldValue = ( { section, payload } ) => ( {
  type: types.UPDATE_FIELD,
  payload,
  section,
} );

export const setCurrentStation = currentStation => ( {
  type: types.SET_CURRENT_STATION,
  payload: { currentStation },
} );

export const setRolesDropdownData = roles => ( {
  type: types.SET_ROLES_DROPDOWN_DATA,
  payload: { roles },
} );

// export const clearNewStaffForm = () => ( {
//   type:CLEAR_NEW_STAFF,
// } );

export const reset = () => ( {
  type: types.RESET,
} );
