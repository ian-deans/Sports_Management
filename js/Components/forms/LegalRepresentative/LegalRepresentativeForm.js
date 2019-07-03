import React from "react";
import { connect } from "react-redux";
import { updateField } from "../../../actions/forms";
import { Form, Input, Message } from 'semantic-ui-react';
import { Button } from "../../common";
import { USStatesDropdown } from "../../common/Dropdown";

const LEGAL_REPRESENTATIVE = "LEGAL_REPRESENTATIVE";

const LegalRepresntativeForm = ({ data, error, updateField, save, saving }) => {
  
  const handleChange = (event, data) => {
    updateField(LEGAL_REPRESENTATIVE, data.name, data.value);
  };

  return (
    <React.Fragment>
      <Form className="component-form-legal-representative">
        <div className="area-inputs">
          <Input
            value={data.first_name || ""}
            onChange={handleChange}
            name="first_name"
            placeholder="First Name"
          />
          <Input
            value={data.last_name || ""}
            onChange={handleChange}
            name="last_name"
            placeholder="Last Name"
          />
          <Input
            value={data.address_street1 || ""}
            onChange={handleChange}
            name="address_street1"
            placeholder="Street Address"
          />


          <div className="inline-group">

            <Input
              style={{maxWidth: "200px"}}
              value={data.address_city || ""}
              onChange={handleChange}
              name="address_city"
              placeholder="City"
              />
            <USStatesDropdown
              style={{minWidth: "150px"}}
              value={data.address_state_code}
              onChange={handleChange}
              name="address_state_code"
              placeholder="State"
            />

            <Input
              style={{maxWidth: "100px"}}
              value={data.address_zip || ""}
              onChange={handleChange}
              name="address_zip"
              placeholder="Zip"
            />
          </div>

          <div className="inline-group full">

          {/* <Input
            value={data.mobile_number || ""}
            onChange={handleChange}
            name="mobile_number"
            placeholder="Phone Number"
            /> */}

          <Input
            value={data.email || ""}
            onChange={handleChange}
            name="email"
            placeholder="Email Address"
            />

          </div>

          
          <Input
            value={""}
            onChange={handleChange}
            name="social"
            //? Social Security does not have a matching field in data from API.
            placeholder="Social Security Number?"
          />
        </div>
        <div className="area-buttons">
          <Button loading={saving} onClick={save}>Save</Button>
        </div>
      </Form>
      {error && (<Message negative><p>{error}</p></Message>)}
    </React.Fragment>
  )
};

const mapStateToProps = state => ({
  data: state.forms.legal_representative,
});

const mapDispatchToProps = {
  updateField,
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalRepresntativeForm);