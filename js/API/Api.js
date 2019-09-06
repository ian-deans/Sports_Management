/* eslint-disable camelcase */
import { formatUIData } from "../helpers/api";
import urls from "./urls";
import ApiClient from "./ApiClient";

const apiClient = new ApiClient( { version: "1" } );

export default {
  // login: data =>
  //   apiClient
  //     .authenticateUser( data ),

  //^ General Purpose

  //^ CONTEXTS
  setOrganizationContext: id => apiClient.post( urls.contexts.ORGANIZATION( id ) ),

  getContext: {
    organization: () => apiClient
      .get( urls.contexts.current.ORGANIZATION )
  },

  //^ ADDRESSES
  createAddress: data => apiClient
    .post( urls.ADDRESSES, data ),

  updateAddress: ( { addressId, payload } ) => apiClient
    .put( urls.ADDRESS( addressId ), payload ),


  //^ CARTS
  getCart: cartId => apiClient
    .get( urls.CARTS( cartId ) ),

  removeCartItem: ids => apiClient
    .delete( urls.CART_ITEMS( ids ) ),

  //^ HOUSEHOLDS GENERIC
  updateHousehold: ( id, data ) => apiClient
    .put( urls.HOUSEHOLD( id ), data ),

  //^ ORGANIZATIONS
  createOrganization: payload => apiClient
    .post( urls.ORGANIZATIONS, payload ),

  //^ PEOPLE
  createPerson: data => apiClient
    .post( urls.PEOPLE, data ),

  getPerson: id => apiClient
    .get( urls.PERSON( id ) ),

  updatePerson: ( id, data ) => apiClient
    .put( urls.PERSON( id ), data ),

  //^ PROGRAMS
  getProgram: programId => apiClient
    .get( urls.PROGRAM( programId ) ),

  getRolesForProgram: programId => apiClient
    .get( urls.PROGRAM_ROLES( programId ) ),

  getEligiblePeopleForRole: ( { program_id, role_id } ) => apiClient
    .get( urls.ELIGIBLE_PEOPLE_FOR_ROLE( { program_id, role_id } ) ),

  getQuestionsForRole: ( { program_id, role_id } ) => apiClient
    .get( urls.QUESTIONS_FOR_ROLE( { program_id, role_id } ) ),


  createRegistrationForDivision: ( { division_id, data } ) => apiClient
    .post( urls.DIVISION_REGISTRATIONS( division_id ), data ),


  getPaymentPlansForOrg: organizationId => apiClient
    .get( urls.PAYMENT_PLANS( organizationId ) ),


  playerRegistration: {
    getEligibleDivisions: ( { program_id, role_id, person_id } ) => apiClient
      .get( urls.ELIGIBLE_DIVISIONS_FOR_PLAYER( { program_id, role_id, person_id } ) ),

    createPlayerProfile: ( { division_id, role_id, person_id } ) => apiClient
      .post( urls.DIVISION_ROLE_PROFILE( { division_id, role_id, person_id } ) ),

    getPlayerProfileForDivision: ( { division_id, role_id, person_id } ) => apiClient
      .get( urls.DIVISION_ROLE_PROFILE( { division_id, role_id, person_id } ) ),

    createCart: () => apiClient
      .post( urls.account.CREATE_CART_FOR_HOUSEHOLD ),

    addRegistrationToCart: ( { registration_id, cart_id } ) => apiClient
      .post( urls.ADD_REGISTRATION_TO_CART( { registration_id, cart_id } ) ),
  },

  init: {
    account: () => apiClient
      .get( urls.account.INIT ),

    hq: () => apiClient
      .get( urls.hq.INIT ),

    user: () => apiClient
      .get( urls.INIT_USER ),
  },

  account: {
    attachPersonToHousehold: id => apiClient
      .post( urls.account.ATTACH_TO_HOUSEHOLD( id ) ),

    createRelationship: ( {
      target_id,
      member_id,
      relation_id,
      receive_communications,
      access_financials,
    } ) => apiClient
      .post(
        urls.account.CREATE_RELATIONSHIP( { target_id, member_id } ),
        { data: { type_id: relation_id, access_financials, receive_communications } }
      ),
    getHouseholdMembers: () => apiClient
      .get( urls.account.HOUSEHOLD_MEMBERS_URL ),

    getPaymentMethods: () => apiClient
      .get( urls.account.PAYMENT_METHODS ),

    getProgram: id => apiClient
      // .get('/programs/' + id + "?include=organization"),
      .get( urls.account.PROGRAM_DEATAILS_URL( id ) ),

    savePaymentMethod: data => apiClient
      .post( urls.account.PAYMENT_METHODS, data ),

    searchForPrograms: options => apiClient
      .get( urls.account.PROGRAM_SEARCH_URL( options ) ),
  },

  hq: {
    getHouseholdById: id => apiClient
      .get( urls.hq.GET_HOUSEHOLD_BY_ID( id ) ),

    getHouseholdSelection: () => apiClient
      .get( urls.hq.GET_HOUSEHOLD_SELECTION ),

    getDashboardStats: () => apiClient
      .get( urls.hq.DASHBOARD_STATS ),

    getOrganizationData: () => apiClient.get( urls.CURRENT_ORGANIZATION ),

    getOrganizationSetupData: id => apiClient.get( urls.hq.ORGANIZATION_SETUP( id ) ),

    savePaymentMethod: data => apiClient
      .post( urls.hq.PAYMENT_METHODS, data ),

    updateBusinessDetails: ( id, business_details ) => apiClient
      .put( urls.ORGANIZATION( id ), business_details ),

    updateProofOfIdImagePath: payload => apiClient
      .put( urls.CURRENT_ORGANIZATION, payload ),

  },

  organizationSetup: {
    addBankAccount: payload => apiClient
      .post( "/organizations/current/bank_accounts", payload ),

    getBankAccounts: () => apiClient
      .get( "/organizations/current/bank_accounts" ),

    getUsersByEmail: email => apiClient
      .get( `/users?filter=email eq ${ email }` ),

    getDetails: () => apiClient
      .get( "/organizations/current" ),

    getLegalRep: () => apiClient
      .get( "/organizations/current/legal_representative" ),

    getStaff: () => apiClient
      .get( "/organizations/current/staff" ),

    getStaffRoles: () => apiClient
      .get( "/role_groups/org/roles" ),

    attachLegalRepresentative: id => apiClient
      .post( urls.organizationSetup.ATTACH_LEGAL_REPRESENTATIVE( id ) ),

    saveNewStaffMember: ( { personId, roleId } ) => apiClient
      .post( `/organizations/current/roles/${ roleId }/people/${ personId }/profiles` ),

    update: payload => apiClient
      .patch( "/organizations/current", payload ),

    updatePUT: ( { id, payload } ) => apiClient
      .put( `/organizations/${ id }`, payload ),

    uploadFile: payload => apiClient
      .postFile( urls.hq.FILES, payload ),
  },

  ui: {
    getUSStates: () =>
      apiClient
        .getUIData( urls.STATES )
        .then( formatUIData ),

    getSportTypes: () =>
      apiClient
        .getUIData( urls.SPORTS )
        .then( formatUIData ),

    getRelationshipTypes: () =>
      apiClient
        .getUIData( urls.RELATIONSHIP_TYPES )
        .then( formatUIData ),

    getOrganizationTypes: () =>
      apiClient
        .getUIData( urls.ORGANIZATION_TYPES )
        .then( formatUIData ),

    getProgramTypes: () =>
      apiClient
        .getUIData( urls.PROGRAM_TYPES )
        .then( formatUIData ),

    getGoverningBodies: () =>
      apiClient
        .getUIData( urls.GOVERNING_BODIES )
        .then( formatUIData ),

    getDocumentTypes: () =>
      apiClient
        .getUIData( urls.DOCUMENT_TYPES )
        .then( formatUIData ),

    getEmailTypes: () =>
      apiClient
        .getUIData( urls.EMAIL_TYPES )
        .then( formatUIData ),

    getFormFieldTypes: () =>
      apiClient
        .getUIData( urls.FORM_FIELD_TYPES )
        .then( formatUIData ),

    getAffiliationTypes: () =>
      apiClient
        .getUIData( urls.AFFILIATES )
        .then( formatUIData ),
  }
};
