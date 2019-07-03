import * as actionTypes from './types';
import API from '../../API/Api';


//^ ACTION CREATORS

const initPlayerRegistrationData = data => ({
  type: actionTypes.REGISTER_PLAYER_INIT,
  payload: data,
});

const setDivisions = divisions => ({
  type: actionTypes.REGISTER_PLAYER_SET_DIVISIONS,
  payload: { divisions },
});

const setPaymentPlans = paymentPlans => ({
  type: actionTypes.REGISTER_PLAYER_SET_PAYMENT_PLANS,
  payload: { paymentPlans },
});

const setPlayers = players => ({
  type: actionTypes.REGISTER_PLAYER_SET_PLAYERS,
  payload: { players },
})

const setQuestions = questions => ({
  type: actionTypes.REGISTER_PLAYER_SET_QUESTIONS,
  payload: { questions },
});

const setQuestionAnswers = answers => ({
  type: actionTypes.REGISTER_PLAYER_SET_QUESTIONS_ANSWERS,
  payload: { answers },
});

const setCart = cart => ({
  type: actionTypes.REGISTER_PLAYER_SET_CART,
  payload: { cart },
});


const setCartId = cartId => ({
  type: actionTypes.REGISTER_PLAYER_SET_CART_ID,
  payload: { cartId },
});

const setDivison = division => ({
  type: actionTypes.REGISTER_PLAYER_SET_DIVISION,
  payload: { division },
});

const setPaymentMethodId = paymentMethodId => ({
  type: actionTypes.REGISTER_PLAYER_SET_PAYMENT_METHOD_ID,
  payload: { paymentMethodId },
});

const setPaymentPlanId = paymentPlanId => ({
  type: actionTypes.REGISTER_PLAYER_SET_PAYMENT_PLAN_ID,
  payload: { paymentPlanId },
});

const setPlayer = player => ({
  type: actionTypes.REGISTER_PLAYER_SET_PLAYER,
  payload: { player },
});

const setProfileId = profileId => ({
  type: actionTypes.REGISTER_PLAYER_SET_PROFILE_ID,
  payload: { profileId },
});

const setRegistrationId = registrationId => ({
  type: actionTypes.REGISTER_PLAYER_SET_REGISTRATION_ID,
  payload: { registrationId },
});


//^ DISPATCHERS

export const initPlayerRegistration = programId =>
  async dispatch => {
    const roleId = (await API.getRolesForProgram(programId))
      .find(role => role.name === "player").id;
    const { org_id, name: program_name } = (await API.getProgram(programId));
    const data = { programId, roleId, org_id, program_name };
    dispatch(initPlayerRegistrationData(data));
  };

export const getEligiblePlayers = () =>
  async (dispatch, getState) => {
    const state = getState();
    if (state.account.playerRegistration.players.length) {
      return;
    }
    const { program_id, role_id } = state.account.playerRegistration;
    return dispatch(
      setPlayers(
        await API.getEligiblePeopleForRole({ program_id, role_id })
      )
    );
  };

export const selectPlayer = personId =>
  async (dispatch, getState) => {
    const state = getState();
    const player = state.account.playerRegistration.players
      .find(p => p.id === personId);
    dispatch(
      setPlayer(player)
    );
  }

export const getEligibleDivisions = () =>
  async (dispatch, getState) => {
    const state = getState();
    if (state.account.playerRegistration.divisions.length) {
      return;
    }
    const { program_id, role_id, person_id } = state.account.playerRegistration;
    dispatch(setDivisions(
      await API.playerRegistration.getEligibleDivisions({ program_id, role_id, person_id })
    ))
  };

export const confirmDivision = divisionId =>
  async (dispatch, getState) => {
    const state = getState();
    const division = state.account.playerRegistration.divisions
      .find(d => d.id === divisionId);
    dispatch(
      setDivison(division)
    );
  }

export const getQuestionsForPlayer = () =>
  async (dispatch, getState) => {
    const state = getState();
    const { program_id, role_id } = state.account.playerRegistration;
    dispatch(
      setQuestions(
        await API.getQuestionsForRole({ program_id, role_id })
      )
    )
  };

export const answerQuestions = answers =>
  async dispatch => dispatch(
    setQuestionAnswers(answers)
  );

export const createPlayerProfile = () =>
  async (dispatch, getState) => {
    const state = getState();
    const { division_id, role_id, person_id } = state.account.playerRegistration;

    const ids = { division_id, role_id, person_id };
    let profile;

    try {
      console.log('Attempting to fetch profile for current set of IDs...')
      profile = (await API.playerRegistration.getPlayerProfileForDivision(ids))[0];
      console.log('Profile found. ', profile)

    } catch (error) {
      console.log(error.status)
      console.log('Profile with current IDs not found, creating a new one...')
      profile = await API.playerRegistration.createPlayerProfile(ids);
      console.log('New profile created for current set of IDs. ', profile)

    }
    dispatch(setProfileId(
      profile.id
    ))
  }

export const getPaymentPlans = () =>
  async (dispatch, getState) => {
    const state = getState();
    const { org_id } = state.account.playerRegistration;
    const paymentPlans = await API.getPaymentPlansForOrg(org_id);
    dispatch(setPaymentPlans(paymentPlans))
  };

export const selectPaymentPlan = id =>
  dispatch => dispatch(
    setPaymentPlanId(id)
  )

export const selectPaymentMethod = id =>
  async dispatch => dispatch(
    setPaymentMethodId(id)
  );

export const prepareCart = () =>
  async (dispatch, getState) => {
    console.log("Preparing Cart...\n");
    const state = getState();
    const { division_id, profile_id, payment_plan_id } = state.account.playerRegistration;
    const data = { data: { profile_id, payment_plan_id } };
    console.log("Creating Registration : ", data);
    const registration = await API.createRegistrationForDivision({ division_id, data });
    console.log("Registration created: ", registration);
    dispatch(setRegistrationId(registration.id));

    const cart = await API.playerRegistration.createCart();
    dispatch(setCartId(cart.id));

    const ids = { registration_id: registration.id, cart_id: cart.id };
    await API.playerRegistration.addRegistrationToCart(ids);
    const updatedCart = await API.getCart(cart.id);
    console.log('Cart updated with registration. ', updatedCart);
    dispatch(setCart(updatedCart));
  }

export const removeCartItem = id =>
  async (dispatch, getState) => {
    const state = getState();
    const {cart_id} = state.account.playerRegistration;
    const response = await API.removeCartItem({cart_id, item_id: id});
    console.log(response)
  }
