import { formatUIData } from "../utilities";
import urls from "./urls";

export default {
  login: async data => {
    return window.cinchFetch.authenticateUser(data);
  },

  //^ General Purpose

  //^ CONTEXTS
  setOrganizationContext: id => window.cinchFetch.post(urls.contexts.ORGANIZATION(id)),

  getContext: {
    organization: () => window.cinchFetch
      .get(urls.contexts.current.ORGANIZATION)
  },

  //^ ADDRESSES
  createAddress: data => window.cinchFetch
    .post(urls.ADDRESSES, data),

  updateAddress: ({ addressId, payload }) => window.cinchFetch
    .put(urls.ADDRESS(addressId), payload),


  //^ CARTS
  getCart: cartId => window.cinchFetch.get(urls.CARTS(cartId)),

  removeCartItem: ids => window.cinchFetch.delete(urls.CART_ITEMS(ids)),

  //^ HOUSEHOLDS GENERIC
  updateHousehold: (id, data) =>
    window.cinchFetch.put(urls.HOUSEHOLD(id), data),

  //^ ORGANIZATIONS
  createOrganization: payload => window.cinchFetch
    .post(urls.ORGANIZATIONS, payload),

  //^ PEOPLE
  createPerson: data => window.cinchFetch
    .post(urls.PEOPLE, data),

  getPerson: id => window.cinchFetch
    .get(urls.PERSON(id)),

  updatePerson: (id, data) => window.cinchFetch
    .put(urls.PERSON(id), data),

  //^ PROGRAMS
  getProgram: programId => window.cinchFetch
    .get(urls.PROGRAM(programId)),

  getRolesForProgram: programId => window.cinchFetch
    .get(urls.PROGRAM_ROLES(programId)),

  getEligiblePeopleForRole: ({ program_id, role_id }) => window.cinchFetch
    .get(urls.ELIGIBLE_PEOPLE_FOR_ROLE({ program_id, role_id })),

  getQuestionsForRole: ({ program_id, role_id }) => window.cinchFetch
    .get(urls.QUESTIONS_FOR_ROLE({ program_id, role_id })),




  createRegistrationForDivision: ({ division_id, data }) => window.cinchFetch
    .post(urls.DIVISION_REGISTRATIONS(division_id), data),



  getPaymentPlansForOrg: organizationId => window.cinchFetch
    .get(urls.PAYMENT_PLANS(organizationId)),


  playerRegistration: {
    getEligibleDivisions: ({ program_id, role_id, person_id }) => window.cinchFetch
      .get(urls.ELIGIBLE_DIVISIONS_FOR_PLAYER({ program_id, role_id, person_id })),

    createPlayerProfile: ({ division_id, role_id, person_id }) => window.cinchFetch
      .post(urls.DIVISION_ROLE_PROFILE({ division_id, role_id, person_id })),

    getPlayerProfileForDivision: ({ division_id, role_id, person_id }) => window.cinchFetch
      .get(urls.DIVISION_ROLE_PROFILE({ division_id, role_id, person_id })),

    createCart: () => window.cinchFetch
      .post(urls.account.CREATE_CART_FOR_HOUSEHOLD),

    addRegistrationToCart: ({ registration_id, cart_id }) => window.cinchFetch
      .post(urls.ADD_REGISTRATION_TO_CART({ registration_id, cart_id })),
  },

  init: {
    account: () => window.cinchFetch
      .get(urls.account.INIT),

    hq: () => window.cinchFetch
      .get(urls.hq.INIT),

    user: () => window.cinchFetch
      .get(urls.INIT_USER),
  },
  account: {
    attachPersonToHousehold: id => window.cinchFetch
      .post(urls.account.ATTACH_TO_HOUSEHOLD(id)),

    createRelationship: ({
      target_id,
      member_id,
      relation_id,
      receive_communications,
      access_financials,
    }) => window.cinchFetch
      .post(
        urls.account.CREATE_RELATIONSHIP({ target_id, member_id }),
        { data: { type_id: relation_id, access_financials, receive_communications } }
      ),

    getHouseholdMembers: () => window.cinchFetch
      .get(urls.account.HOUSEHOLD_MEMBERS_URL),

    getPaymentMethods: () => window.cinchFetch
      .get(urls.account.PAYMENT_METHODS),

    getProgram: id => window.cinchFetch
      // .get('/programs/' + id + "?include=organization"),
      .get(urls.account.PROGRAM_DEATAILS_URL(id)),

    savePaymentMethod: data => window.cinchFetch
      .post(urls.account.PAYMENT_METHODS, data),

    searchForPrograms: options => window.cinchFetch
      .get(urls.account.PROGRAM_SEARCH_URL(options)),
  },
  hq: {
    getHouseholdById: id => window.cinchFetch
      .get(urls.hq.GET_HOUSEHOLD_BY_ID(id)),

    getHouseholdSelection: () => window.cinchFetch
      .get(urls.hq.GET_HOUSEHOLD_SELECTION),

    getDashboardStats: () => window.cinchFetch
      .get(urls.hq.DASHBOARD_STATS),

    getOrganizationData: () => window.cinchFetch.get(urls.CURRENT_ORGANIZATION),

    getOrganizationSetupData: id => window.cinchFetch.get(urls.hq.ORGANIZATION_SETUP(id)),

    savePaymentMethod: data => window.cinchFetch
      .post(urls.hq.PAYMENT_METHODS, data),

    updateBusinessDetails: (id, business_details) => window.cinchFetch
      .put(urls.ORGANIZATION(id), business_details),

    updateProofOfIdImagePath: payload => window.cinchFetch
      .put(urls.CURRENT_ORGANIZATION, payload),
      
    uploadFile: payload => window.cinchFetch
      .postFile(urls.hq.FILES, payload),

  },

  organizationSetup: {
    attachLegalRepresentative: id => window.cinchFetch
      .post(urls.organizationSetup.ATTACH_LEGAL_REPRESENTATIVE(id)),
  },

  ui: {
    getUSStates: () =>
      window.cinchFetch.getUIData(urls.STATES)
        .then(formatUIData),

    getSportTypes: () =>
      window.cinchFetch.getUIData(urls.SPORTS)
        .then(formatUIData),

    getRelationshipTypes: () =>
      window.cinchFetch.getUIData(urls.RELATIONSHIP_TYPES)
        .then(formatUIData),

    getOrganizationTypes: () =>
      window.cinchFetch.getUIData(urls.ORGANIZATION_TYPES)
        .then(formatUIData),

    getProgramTypes: () =>
      window.cinchFetch.getUIData(urls.PROGRAM_TYPES)
        .then(formatUIData),

    getGoverningBodies: () =>
      window.cinchFetch.getUIData(urls.GOVERNING_BODIES)
        .then(formatUIData),

    getDocumentTypes: () =>
      window.cinchFetch.getUIData(urls.DOCUMENT_TYPES)
        .then(formatUIData),

    getEmailTypes: () =>
      window.cinchFetch.getUIData(urls.EMAIL_TYPES)
        .then(formatUIData),

    getFormFieldTypes: () =>
      window.cinchFetch.getUIData(urls.FORM_FIELD_TYPES)
        .then(formatUIData)
  }
};
