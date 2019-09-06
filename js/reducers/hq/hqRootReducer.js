/* eslint-disable camelcase */
import * as appActions from "../../actions/app/types";
import * as actions from "../../actions/hq/types";

const initialState = {
  organization_data: null,
  dashboard_stats: {},
  programs: [],
  registrations: [],
  registration_id: [],
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case appActions.SET_HQ: {
      return {
        ...state,
        organization_data: action.payload.organization_data,
        programs: action.payload.programs,
        households: action.payload.households,
      };
    }

    case actions.HQ_SET_DASHBOARD_STATS: {
      return {
        ...state,
        dashboard_stats: action.payload.dashboard_stats,
      };
    }

    case actions.HQ_SET_PROGRAMS: {
      return {
        ...state,
        programs: action.payload.programs,
      };
    }
    case actions.HQ_SET_REGISTRATIONS: {
      return {
        ...state,
        registrations: action.payload.registrations,

        //^ Eventually switch over to new standard below.
        // registrations: {...action.payload.registrations},
        // registration_ids: [...action.payload.registration_ids],
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;