import * as actionTypes from "./types";
import API from "../../API/Api";

//^ ACTIONS
const setCurrentData = currentData => ({
  type: actionTypes.HQ_HOUSEHOLDS_SET_CURRENT_DATA,
  payload: {currentData},
});

const setDashboardStats = dashboard_stats => ({
  type: actionTypes.HQ_SET_DASHBOARD_STATS,
  payload: {dashboard_stats},
});


const setHouseholdSelection = selection => ({
  type: actionTypes.HQ_HOUSEHOLDS_SET_HOUSEHOLD_SELECTION,
  payload: {selection},
});


//^ ACTION DISPATCHERS

export const getDashboardStats = () =>
  async dispatch => {
    const stats = await API.hq.getDashboardStats();
    return dispatch(setDashboardStats(stats));
  };




export const selectHousehold = id =>
  async (dispatch, getState) => {
    const household = await API.hq.getHouseholdById(id);

    if (!household) {
      throw new Error("Household not found.");
    }
    const currentData = removeUndefinedProperties(extractHouseholdData(household));
    dispatch(setCurrentData(currentData));
  };

export const getHouseholdSelection = () =>
  async dispatch => {
    const selectionData = await API.hq.getHouseholdSelection();
    const selection = selectionData
      .map(({id,name}) =>
        ({key: id, value: id, text: name}))
    return dispatch(setHouseholdSelection(selection));
  };

export const updateHousehold = ({id, ...fields}) =>
  async dispatch => {
    const data = {
      data: {
        ...fields,
      }
    };
    try {
      await API.updateHousehold(id, data);
      const household = await API.hq.getHouseholdById(id);
      const currentData = removeUndefinedProperties(extractHouseholdData(household));      
      return dispatch(setCurrentData(currentData));
    } catch(error) {
      throw error;
    }
  };





//^ HELPER FUNCTIONS
const extractHouseholdData = household => {
  const {members, emergency_contacts, documents, payment_methods, orders, ...info } = household;
  return {
    info,
    members: members && members.data,
    contacts: emergency_contacts && emergency_contacts.data,
    documents: document && document.data,
    payment_methods: payment_methods && payment_methods.data,
    orders: orders && orders.data,
  };
};

const removeUndefinedProperties = object => {
  for (let key in object) {
    if (!object[key]) {
      object[key] = [];
    }
  }
  return object;
};