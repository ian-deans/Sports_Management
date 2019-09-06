/* eslint-disable camelcase */
import * as actionTypes from "./types";
import API from "../../api/Api";
import * as log from "../../helpers/log";
import { removeUndefinedProperties } from "../../helpers/object";

//^ ACTIONS
const setCurrentData = currentData => ( {
  type: actionTypes.HQ_HOUSEHOLDS_SET_CURRENT_DATA,
  payload: { currentData },
} );

const setDashboardStats = dashboard_stats => ( {
  type: actionTypes.HQ_SET_DASHBOARD_STATS,
  payload: { dashboard_stats },
} );


const setHouseholdSelection = selection => ( {
  type: actionTypes.HQ_HOUSEHOLDS_SET_HOUSEHOLD_SELECTION,
  payload: { selection },
} );


//^ ACTION DISPATCHERS

export const getDashboardStats = () =>
  async dispatch => {
    const stats = await API.hq.getDashboardStats();
    return dispatch( setDashboardStats( stats ) );
  };


export const selectHousehold = id =>
  async ( dispatch ) => {
    const household = await API.hq.getHouseholdById( id );

    if ( !household ) {
      throw new Error( "Household not found." );
    }
    const currentData = removeUndefinedProperties( extractHouseholdData( household ) );
    dispatch( setCurrentData( currentData ) );
  };

export const getHouseholdSelection = () =>
  async dispatch => {
    const selectionData = await API.hq.getHouseholdSelection();
    const selection = selectionData
      .map( ( { id, name } ) =>
        ( { key: id, value: id, text: name } ) );
    return dispatch( setHouseholdSelection( selection ) );
  };

export const updateHousehold = ( { id, ...fields } ) =>
  async dispatch => {
    const data = {
      data: {
        ...fields,
      }
    };
    try {
      await API.updateHousehold( id, data );
      const household = await API.hq.getHouseholdById( id );
      const currentData = removeUndefinedProperties( extractHouseholdData( household ) );
      return dispatch( setCurrentData( currentData ) );
    } catch ( err ) {
      log.error( err );
      throw err;
    }
  };


//^ HELPER FUNCTIONS
const extractHouseholdData = household => {
  const { members, emergency_contacts, documents, payment_methods, orders, ...info } = household;
  return {
    info,
    members: members && members.data,
    contacts: emergency_contacts && emergency_contacts.data,
    documents: documents && documents.data,
    payment_methods: payment_methods && payment_methods.data,
    orders: orders && orders.data,
  };
};

