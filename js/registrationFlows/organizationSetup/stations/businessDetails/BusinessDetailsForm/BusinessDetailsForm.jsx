/* eslint-disable no-console */
import React from "react";
import { Form, Input, TextArea } from "semantic-ui-react";
import { Button } from "../../../../../components/common";
import {
  AffiliatesDropdown,
  USStatesDropdown,
  SportTypesDropdown
} from "../../../../../components/common/Dropdown";
import "./BusinessDetailsForm.less";

export const BusinessDetailsForm = ( { data = {}, handleChange, save, saving } ) => {
  return (
    <Form className="form-business-details">
      <div className="area-top">
        <Input
          onChange={ handleChange }
          value={ data.name || "" }
          name="name"
          placeholder="Organization Name"
        />
        <Input
          onChange={ handleChange }
          value={ data.website_url || "" }
          name="website_url"
          placeholder="YOURCLUB.cinchsports.com"
        />
        <Input
          onChange={ handleChange }
          value={ data.address_street1 || "" }
          name="address_street1"
          placeholder="Street Address"
        />
        <Input
          onChange={ handleChange }
          value={ data.address_street2 || "" }
          name="address_street2"
          placeholder="Street Address 2"
        />
      </div>
      <div className="area-middle">
        <Input
          onChange={ handleChange }
          value={ data.address_city || "" }
          name="address_city"
          placeholder="City"
        />

        <USStatesDropdown
          name="address_state_code"
          value={ data.address_state_code || 1 }
        />

        <Input
          onChange={ handleChange }
          value={ data.address_zip || "" }
          name="address_zip"
          placeholder="Zip"
        />

        <SportTypesDropdown
          onChange={ handleChange }
          value={ data.sport_id }
          name="sport_id"
        />

        <AffiliatesDropdown
          onChange={ handleChange }
          value={ undefined }
          name="affiliation"
        />

        <Input
          onChange={ handleChange }
          value={ data.tax_id || "" }
          name="tax_id"
          placeholder="Federal Tax ID"
        />
      </div>
      <div className="area-bottom">
        <TextArea
          onChange={ handleChange }
          value={ data.description || "" }
          name="description"
          placeholder="Describe your organization..."
        />
      </div>

      <div className="area-buttons">
        <Button loading={ saving } disabled={ saving } onClick={ save }>Save</Button>
      </div>
    </Form>

  );
};
