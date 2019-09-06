/* eslint-disable camelcase */
import * as actions from "../../actions/account/types";


const initialState = {
  program_name: null,
  org_id: null,
  program_id: null,
  role_id: null,
  person_id: null,
  player: null,
  division_id: null,
  division: null,
  answers: null,
  profile_id: null,
  payment_plan_id: null,
  payment_method_id: null,
  cart_id: null,
  registration_id: null,
  players: [],
  divisions: [],
  questions: [],
  payment_plans: [],
  cart: null,
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {

    case actions.REGISTER_PLAYER_INIT:
      return {
        ...state,
        role_id: action.payload.roleId,
        program_id: action.payload.programId,
        org_id: action.payload.org_id,
        program_name: action.payload.program_name,
      };

    case actions.REGISTER_PLAYER_SET_PLAYERS:
      return {
        ...state,
        players: action.payload.players,
      };

    case actions.REGISTER_PLAYER_SET_CART:
      return {
        ...state,
        cart: action.payload.cart,
      };

    case actions.REGISTER_PLAYER_SET_DIVISIONS:
      return {
        ...state,
        divisions: action.payload.divisions,
      };

    case actions.REGISTER_PLAYER_SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
      };

    case actions.REGISTER_PLAYER_SET_QUESTIONS_ANSWERS:
      return {
        ...state,
        answers: action.payload.answers,
      };

    case actions.REGISTER_PLAYER_SET_PAYMENT_PLANS:
      return {
        ...state,
        payment_plans
        : action.payload.paymentPlans,
      };

    case actions.REGISTER_PLAYER_SET_PLAYER:
      return {
        ...state,
        player: action.payload.player,
        person_id: action.payload.player.id,
      };

    case actions.REGISTER_PLAYER_SET_DIVISION:
      return {
        ...state,
        division: action.payload.division,
        division_id: action.payload.division.id,
      };


    case actions.REGISTER_PLAYER_SET_PROFILE_ID:
      return {
        ...state,
        profile_id: action.payload.profileId,
      };

    case actions.REGISTER_PLAYER_SET_PAYMENT_PLAN_ID:
      return {
        ...state,
        payment_plan_id: action.payload.paymentPlanId,
      };

    case actions.REGISTER_PLAYER_SET_PAYMENT_METHOD_ID:
      return {
        ...state,
        payment_method_id: action.payload.paymentMethodId,
      };

    case actions.REGISTER_PLAYER_SET_REGISTRATION_ID:
      return {
        ...state,
        registration_id: action.payload.registrationId,
      };

    case actions.REGISTER_PLAYER_SET_CART_ID:
      return {
        ...state,
        cart_id: action.payload.cartId,
      };

    case actions.REGISTER_PLAYER_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default reducer;