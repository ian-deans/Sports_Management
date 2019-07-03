import React from "react";
import { connect } from "react-redux";
import { Form, Input, TextArea } from "semantic-ui-react";
import { Button, USStatesDropdown, FileUpload } from "../../common";
import { updateField } from "../../../actions/forms";

const BUSINESS_DETAILS = "BUSINESS_DETAILS";

const BusinessDetailsForm = ({data, updateField, save, saving}) => {
  // let saving = false;

  const handleChange = (event, data) => {
    console.log(data);
    updateField(BUSINESS_DETAILS, data.name, data.value);
  };

  // const _save = () => {
  //   saving = true;
  // }
  return (
    <Form className="component-form-business-details">
      <div className="area-top">
        <Input
          onChange={handleChange}
          value={data.name || ""}
          name="name"
          placeholder="Organization Name"
        />
        <Input
          onChange={handleChange}
          value={data.website_url || ""}
          name="website_url"
          placeholder="YOURCLUB.cinchsports.com"
        />
        <Input
          onChange={handleChange}
          value={data.address_street1 || ""}
          name="address_street1"
          placeholder="Street Address"
        />
        <Input
          onChange={handleChange}
          value={data.address_street2 || ""}
          name="address_street2"
          placeholder="Street Address 2"
        />
      </div>
      <div className="area-middle">
        <Input
          onChange={handleChange}
          value={data.address_city || ""}
          name="address_city"
          placeholder="City"
        />
        
        {/* Replace with US States Dropdown */}
        <Input
          onChange={handleChange}
          value={data.address_state_code || ""}
          name="address_state_code"
          placeholder="State"
        />
        <Input
          onChange={handleChange}
          value={data.address_zip || ""}
          name="address_zip"
          placeholder="Zip"
        />

        {/* swap for a dropdown component */}
        <Input
          onChange={handleChange}
          value={data.sport_id || ""}
          name="sport_id"
          placeholder="Sport"
        />
        <Input
          onChange={handleChange}
          name="affliation"
          placeholder="Affiliation"
        />
        <Input
          onChange={handleChange}
          value={data.tax_id || ""}
          name="tax_id"
          placeholder="Federal Tax ID"
        />
      </div>
      <div className="area-bottom">
        <TextArea
          onChange={handleChange}
          value={data.description || ""}
          name="description"
          placeholder="Describe your organization..."
        />
      </div>
      <div className="area-side">
        <FileUpload setFile={file => console.log(file)} />
      </div>
      <div className="area-buttons">
        <Button loading={saving} disabled={saving} onClick={save}>Save</Button>
      </div>
    </Form>
  )
};

const mapStateToProps = state => ({
  data: state.forms.business_details,
});

const mapDispatchToProps = {
  updateField,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDetailsForm);