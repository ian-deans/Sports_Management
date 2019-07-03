import { combineReducers } from "redux"

import businessDetailsReducer from "./forms/businessDetailsReducer";
import legalRepresentativeReducer from "./forms/legalRepresentativeReducer";
import personReducer from "./forms/personReducer";

export default combineReducers({
  business_details: businessDetailsReducer,
  legal_representative: legalRepresentativeReducer,
  person: personReducer,
});