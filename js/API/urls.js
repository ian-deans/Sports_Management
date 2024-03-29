
const CURRENT = "/current";
// const ALL = "/all"; //!FIXME unused variable
const ORGANIZATIONS = "/organizations";
const HOUSEHOLDS = "/households";
const PROGRAMS = "/programs";
const USERS = "/users";
const DIVISIONS = "/divisions";
const REGISTRATIONS = "/registrations";
const PEOPLE = "/people";
const QUESTIONS = "/questions";
const PROFILES = "/profiles";
const PAYMENT_METHODS = "/payment_methods";
const PAYMENT_PLANS = "/payment_plans";
const CARTS = "/carts";
const LEGAL_REPRESENTATIVE = "/legal_representative";
const ROLES = "/roles";
const ELIGIBILE = "/eligible";
const MEMBERS = "/members";
const RELATIONSHIPS = "/relationships";
const ADDRESSES = "/addresses";


//^ ********** APP  **********
const CURRENT_USER = USERS + CURRENT;
const CURRENT_HOUSEHOLD = HOUSEHOLDS + CURRENT;
const CURRENT_ORGANIZATION = ORGANIZATIONS + CURRENT;
const CURRENT_PROGRAM = PROGRAMS + CURRENT;


export default {
  STATES: "/states",
  SPORTS: "/sports",
  RELATIONSHIP_TYPES: "/relationship-types",
  ORGANIZATION_TYPES: "/organization-types",
  PROGRAM_TYPES: "/program-types",
  GOVERNING_BODIES: "/governing-bodies",
  DOCUMENT_TYPES: "/document-types",
  EMAIL_TYPES: "/email-types",
  FORM_FIELD_TYPES: "/form_field_types",
  AFFILIATES: "/affiliates",


  ADDRESSES,
  ADDRESS: id => `${ ADDRESSES }/${ id }`,
  ORGANIZATIONS,
  ORGANIZATION: id => ORGANIZATIONS + `/${ id }`,
  PEOPLE,
  PERSON: id => PEOPLE + `/${ id }`,

  CURRENT_ORGANIZATION,
  CURRENT_HOUSEHOLD,
  CURRENT_PROGRAM,

  contexts: {
    current: {
      ORGANIZATION: "/contexts/organization/current",
      HOUSEHOLD: "/contexts/household/current",
      PROGRAM: "/contexts/program/current",
    },
    ORGANIZATION: id => `/contexts/organization/${ id }`,
    HOUSEHOLD: id => `/contexts/household/${ id }`,
    PROGRAM: id => `/contexts/program/${ id }`,
  },


  ORGANIZATION_LEGAL_REPRESENTATIVE: id => ORGANIZATIONS + `/${ id }` + LEGAL_REPRESENTATIVE,
  HOUSEHOLDS: id => HOUSEHOLDS + `/${ id }`,
  PROGRAMS: id => PROGRAMS + `${ id }`,

  INIT_USER: CURRENT_USER
    + "?include=contexts,person",

  CARTS: id => CARTS
    + `/${ id }?include=cart_items`,

  CART_ITEMS: ( { cartId, itemId } ) => CARTS
    + `/${ cartId }/cart_items/${ itemId }`,

  HOUSEHOLD: id => HOUSEHOLDS + `/${ id }`,

  PAYMENT_PLANS: id => ORGANIZATIONS + `/${ id }` + PAYMENT_PLANS,

  PROGRAM: id => PROGRAMS + `/${ id }`,

  PROGRAM_ROLES: id => PROGRAMS + `/${ id }` + ROLES,

  ELIGIBLE_PEOPLE_FOR_ROLE: ( { programId, roleId } ) =>
    PROGRAMS + `/${ programId }` + ROLES + `${ roleId }` + ELIGIBILE,

  ELIGIBLE_DIVISIONS_FOR_PLAYER: ( { programId, roleId, personId } ) =>
    PROGRAMS + `/${ programId }` + ROLES + `/${ roleId }` + PEOPLE + `/${ personId }` + DIVISIONS,

  QUESTIONS_FOR_ROLE: ( { programId, roleId } ) =>
    `${ PROGRAMS }/${ programId }${ ROLES }/${ roleId }${ QUESTIONS }`,

  DIVISION_ROLE_PROFILE: ( { divisionId, roleId, personId } ) =>
    `${ DIVISIONS }/${ divisionId }${ ROLES }/${ roleId }${ PEOPLE }/${ personId }${ PROFILES }`,

  DIVISION_REGISTRATIONS: id => `${ DIVISIONS }/${ id }${ REGISTRATIONS }`,

  ADD_REGISTRATION_TO_CART: ( { registrationId, cartId } ) =>
    `${ CARTS }/${ cartId }${ REGISTRATIONS }/${ registrationId }`,

  //^ ********** ACCOUNT
  account: {
    INIT: CURRENT_HOUSEHOLD
      + "?include=address,payment_methods,members"
      + "&fields[members]=id,first_name,last_name,gender,birthdate,profile_image_path"
      + "&fields[payment_methods]=id,created_at,card_brand,last4,customer_name",

    ATTACH_TO_HOUSEHOLD: id => `${ CURRENT_HOUSEHOLD }${ MEMBERS }/${ id }`,

    HOUSEHOLD_MEMBERS_URL: CURRENT_HOUSEHOLD + MEMBERS,

    CREATE_RELATIONSHIP: ( { targetId, memberId } ) => CURRENT_HOUSEHOLD
      + `${ MEMBERS }/${ targetId }${ RELATIONSHIPS }/${ memberId }`,

    CREATE_CART_FOR_HOUSEHOLD: `${ CURRENT_HOUSEHOLD }${ CARTS }`,

    PAYMENT_METHODS: CURRENT_HOUSEHOLD
      + PAYMENT_METHODS,

    PROGRAM_DEATAILS_URL: programId =>
      `${ PROGRAMS }/${ programId }`
      + "?include=organization,divisions"
      + "&fields[programs]=id,name,description,administrative_fee,cost_highest,cost_lowest,start_date,end_date"
      + "&fields[organization]=name,logo_image_path,address_street1,address_city,address_state_code"
      + "&fields[divisions]=birthdate_youngest,birthdate_oldest",

    PROGRAM_SEARCH_URL: ( { typeId, sportId } ) => {
      let url = `${ PROGRAMS }/all`
        + "?include=organization"
        + "&fields[organization]=name,address_city,logo_image_path"
        + "&fields[programs]=id,name,start_date,end_date,cost_highest,cost_lowest";
      if ( !typeId && !sportId ) {
        return url;
      }

      let filters = [];

      if ( typeId ) {
        filters.push( `typeId = ${ typeId }` );
      }

      if ( sportId ) {
        filters.push( `sportId = ${ sportId }` );
      }

      let filter = "&filter=" + filters.join( "," );
      url += filter;
      return url;

    },

  },


  //^ ********** HQ
  hq: {
    FILES: `${ CURRENT_ORGANIZATION }/files`,

    INIT: CURRENT_ORGANIZATION
      + "?include=programs,"
      + "fields[programs]=name,logo_image_path,max_registrations",

    GET_HOUSEHOLD_BY_ID: id => `${ HOUSEHOLDS }/${ id }`
      + "?include=members,emergency_contacts,documents,orders,payment_methods"
      + "&fields[members]=profile_image_path,full_name,gender,birthdate,id,email,mobile_number"
      + "&fields[payment_methods]=customer_name,last4,expiration_month,expiration_year,card_brand",

    GET_HOUSEHOLD_SELECTION: `${ HOUSEHOLDS }?fields=name,id&per_page=50`,

    DASHBOARD_STATS: `${ CURRENT_ORGANIZATION }/dashboard`,

    ORGANIZATION_SETUP: organizationId => `${ ORGANIZATIONS }/${ organizationId }`
      + "?include=legal_representative",

    PAYMENT_METHODS: `${ CURRENT_ORGANIZATION }${ PAYMENT_METHODS }`,
  },

  organizationSetup: {
    ATTACH_LEGAL_REPRESENTATIVE: id => `${ CURRENT_ORGANIZATION }${ LEGAL_REPRESENTATIVE }/${ id }`,
  },
};


