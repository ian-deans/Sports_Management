import * as types from "./types";

const initialState = {
  currentStation: 0,
  stationNames: [
    "Business Details",
    "Legal Representative",
    "Proof of ID",
    "Bank Information",
    "Administrators"
  ],
};

const initialAction = {};

export const organizationSetupReducer = ( state = initialState, action = initialAction ) => {
  switch ( action.type ) {

    case types.SET_BANK_ACCOUNTS:
      return {
        ...state,
        bankAccounts: { ...action.payload.bankAccounts },
        bankAccountIds: [ ...action.payload.bankAccountIds ]
      };

    case types.SET_BUSINESS_DETAILS:
      return {
        ...state,
        businessDetails: { ...action.payload.businessDetails },
      };

    case types.SET_LEGAL_REPRESENTATIVE:
      return {
        ...state,
        legaRepresentative: { ...action.payload.legalRepresentative },
      };

    case types.SET_STAFF:
      return {
        ...state,
        administrators: {
          staff: { ...action.payload.staff },
          staffIds: [ ...action.payload.staffIds ]
        }
      };

    case types.SET_USERS:
      return {
        ...state,
        newStaff: {
          ...state.newStaff,
          users: { ...action.payload.users },
          userIds: [ ...action.payload.userIds ],
        }
      };

    case types.SET_PERSON_ID:
      return {
        ...state,
        newStaff: {
          ...state.newStaff,
          personId: action.payload.personId,
        }
      };

    case types.SET_ROLE_ID:
      return {
        ...state,
        newStaff: {
          ...state.newStaff,
          roleId: action.payload.roleId,
        }
      };

    case types.SET_ROLES_DROPDOWN_DATA:
      return {
        ...state,
        newStaff: {
          ...state.newStaff,
          rolesDropdownData: [ ...action.payload.roles ],
        }
      };

    case types.SET_PAYMENT_METHODS:
      return {
        ...state,
        paymentMethods: { ...action.payload.paymentMethods },
      };

    case types.UPDATE_FIELD:
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [ action.payload.fieldName ]: action.payload.value,
        },
      };

    case types.SET_CURRENT_STATION:
      return {
        ...state,
        currentStation: action.payload.currentStation,
      };

    case types.RESET:
      return {
        ...initialState
      };

    default:
      return state;
  }
};