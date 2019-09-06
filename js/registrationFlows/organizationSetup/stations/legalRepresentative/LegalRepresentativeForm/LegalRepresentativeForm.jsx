import React from "react";
import { Form, Input } from "semantic-ui-react";
import { Button } from "../../../../../components/common";
import { USStatesDropdown } from "../../../../../components/common/Dropdown";
import "./LegalRepresentativeForm.less";

const LegalRepresentativeForm = ( { data = {}, handleChange, save, saving } ) => {
  return (
    <Form className="cs-form">
      {/* <div className="area-inputs"> */ }
      <Input
        value={ data.first_name || "" }
        onChange={ handleChange }
        name="first_name"
        placeholder="First Name"
      />
      <Input
        value={ data.last_name || "" }
        onChange={ handleChange }
        name="last_name"
        placeholder="Last Name"
      />
      <Input
        value={ data.address_street1 || "" }
        onChange={ handleChange }
        name="address_street1"
        placeholder="Street Address"
      />


      <div className="inline-group">

        <Input
          style={ { maxWidth: "200px" } }
          value={ data.address_city || "" }
          onChange={ handleChange }
          name="address_city"
          placeholder="City"
        />
        <USStatesDropdown
          style={ { minWidth: "150px" } }
          value={ data.address_state_code }
          onChange={ handleChange }
          name="address_state_code"
          placeholder="State"
        />

        <Input
          style={ { maxWidth: "100px" } }
          value={ data.address_zip || "" }
          onChange={ handleChange }
          name="address_zip"
          placeholder="Zip"
        />
      </div>

      <div>
        <Input
          value={ data.mobile_number || "" }
          onChange={ handleChange }
          name="mobile_number"
          placeholder="Phone Number"
        />

        <Input
          value={ data.email || "" }
          onChange={ handleChange }
          name="email"
          placeholder="Email Address"
        />

      </div>


      <Input
        value={ "" }
        onChange={ handleChange }
        name="social"
        //? Social Security does not have a matching field in data from API.
        placeholder="Social Security Number?"
      />
      {/* </div> */ }
      <Button loading={ saving } onClick={ save }>Save</Button>
    </Form>

  );
};

export default LegalRepresentativeForm;