import API from "../../API/Api";
import * as actions from "./types";
import * as formActions from "../forms/types";
import {
  changedFields,
  extractAddressFields,
  isEmpty,
  removeNullFields
} from "../../utilities";

const BUSINESS_DETAILS = "business_details";
const LEGAL_REPRESENTATIVE = "legal_representative";

//^ Action Creators
const setBusinessDetails = business_details => ({
  type: formActions.FORMS_BUSINESS_DETAILS_SET_FIELDS,
  payload: { business_details },
});

const setLegalRepresentative = legal_representative => ({
  type: formActions.FORMS_LEGAL_REPRESENTATIVE_SET_FIELDS,
  payload: { legal_representative },
});

const reset = () => ({
  type: actions.ORGANIZATION_SETUP_RESET,
});




export const loadOrganizationData = () =>
  async (dispatch, getState) => {
    try {
      const { organization_context } = getState().app;
      checkIfValidContext(organization_context);

      const { active_context_id, default_context_id } = organization_context;
      compareContextIds(active_context_id, default_context_id);

      const organizationId = active_context_id;
      const organizationData = await API.hq.getOrganizationSetupData(organizationId);
      const [businessDetails, legalRep] = splitLegalAndBusinessDetails(organizationData);

      dispatch(setBusinessDetails(businessDetails));
      if (legalRep) {
        dispatch(setLegalRepresentative(legalRep))
      }

    } catch (error) {
      throw error;
    }
  };

export const resetState = () =>
  dispatch => dispatch(reset());

export const saveNewOrganization = () =>
  async (dispatch, getState) => {
    const { business_details } = getState().forms;
    const fields = removeNullFields(business_details);
    let [detailsData, addressFields] = extractAddressFields(fields);

    detailsData = await createAndAttachAddress(detailsData, addressFields);

    const payload = { data: { ...detailsData } };
    try {
      const organization = await API.createOrganization(payload);
      await API.setOrganizationContext(organization.id);

    } catch (error) {
      throw error;
    }
  };

export const saveNewLegalRepresentative = () =>
  async (dispatch, getState) => {
    const { legal_representative } = getState().forms;
    const fields = removeNullFields(legal_representative);
    let [personData, addressFields] = extractAddressFields(fields);

    personData = await createAndAttachAddress(personData, addressFields);

    const payload = { data: { ...personData } };
    try {
      const person = await API.createPerson(payload);
      await API.organizationSetup.attachLegalRepresentative(person.id);

    } catch (error) {
      throw error;
    };
  };

export const saveNewPaymentMethod = data =>
  async (dispatch, getState) => {
    const state = getState();
    const { payment_methods } = state.organizationSetup;

    try {
      const response = await API.hq.savePaymentMethod(data);
      payment_methods.push(response);
      // return dispatch(setPaymentMethods(payment_methods));

    } catch (error) {
      console.error(error)
      return {
        message: "Error occurred while attempting to save new payment method.",
        error,
      };
    }
  };

export const updateBusinessDetails = () =>
  async (dispatch, getState) => {
    const [id, oldData, changedData] = await separateData(getState, BUSINESS_DETAILS);
    const [detailsData, addressFields] = extractAddressFields(changedData);
    const resetFn = () => dispatch(setBusinessDetails(oldData));
    updateAddress(oldData.address_id, addressFields, resetFn);

    if (!isEmpty(detailsData)) {
      const payload = { data: { ...detailsData } };
      return API.hq.updateBusinessDetails(id, payload)
        .catch(error => {
          dispatch(setBusinessDetails(oldData));
          throw error;
        });
    };
  };

export const updateLegalRepresentative = () =>
  async (dispatch, getState) => {
    const [id, oldData, changedData] = await separateData(getState, LEGAL_REPRESENTATIVE);
    const [repData, addressFields] = extractAddressFields(changedData);
    const resetFn = () => dispatch(setLegalRepresentative(oldData));
    updateAddress(oldData.address_id, addressFields, resetFn)

    if (!isEmpty(repData)) {
      const payload = { data: { ...repData } };
      return API.updatePerson(id, payload)
        .catch(error => {
          dispatch(setLegalRepresentative(oldData));
          throw error;
        });
    };
  };

export const uploadPhotoId = formData =>
  async dispatch => {
    const imagePath = (await API.hq.uploadFile(formData))[0]
    const payload = {data: {proof_of_id_image_path: imagePath}};
    return API.hq.updateProofOfIdImagePath(payload);
  };

//^ HELPER FUNCTIONS

function assignApiFunction(formName) {
  switch (formName) {
    case BUSINESS_DETAILS: {
      return API.hq.getOrganizationData;
    };

    case LEGAL_REPRESENTATIVE: {
      return API.getPerson;
    };

    default: {
      return null;
    };
  };
};

function checkIfValidContext(context) {
  if (!context) {
    //? return begin new organization setup function?
    console.warn("No organization context found.");
    console.trace();
    throw new Error("No Organization context found.");
  }
};

function compareContextIds(activeId, defaultId) {
  const contextMismatch = activeId !== defaultId;
  if (contextMismatch) {
    console.warn("Active organization context does not match default organization context.");
    console.warn("Using active organization id...");
    //? prompt user to create a new organization?
    //? dispatch action to set organization context?
  }
};

function createAndAttachAddress(data, addressFields) {
  if (addressFields) {
    const payload = { data: { ...addressFields } };
    return API.createAddress(payload)
      .then(addressObj => {
        data.address_id = addressObj.id;
        return data;
      })
  }
  return data;
};

function separateData(getState, formName) {
  const { id, ...currentData } = getState().forms[formName];
  const apiFn = assignApiFunction(formName);
  return apiFn()
    .then(oldData => {
      const changedData = changedFields(currentData, oldData);
      return [id, oldData, changedData];
    })
    .catch(console.error)
};

function splitLegalAndBusinessDetails(organizationData) {
  if (organizationData.legal_representative) {
    const { legal_representative: {
      data: legalRep
    }, ...businessDetails } = organizationData;
    return [businessDetails, legalRep];
  }

  return [organizationData, null];
}

function updateAddress(addressId, addressFields, resetFn) {
  if (addressFields) {
    console.warn("Address data found, updating address with id ", addressId);
    const payload = { data: { ...addressFields } };
    API.updateAddress({ addressId, payload })
      .catch(error => {
        console.warn(error);
        resetFn();
      })
  };
};


