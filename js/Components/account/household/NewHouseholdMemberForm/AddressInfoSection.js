import React from "react";
import { Grid, Form } from "semantic-ui-react";
import { Dropdown, Header, Input } from "../../../common";

class AddressInfoSection extends React.Component {

  handleChange = ( event, data ) => {
    this.props.handleChangeFn( "addressData", data );
  }

  render() {
    const {
      sameAddress,
      street,
      city,
      state,
      zip,
      usStates,
    } = this.props;
    return (
      <Grid.Row columns="equal" className="form-section">
        <Grid.Column stretched width={ 3 }>
          <Header as="h5">Address</Header>
          <Form.Field>

            <Form.Checkbox
              name="sameAddress"
              onChange={ this.handleChange }
              checked={ sameAddress }
            />
            <label>Same as Household</label>
          </Form.Field>
        </Grid.Column>

        <Grid.Column>
          <Form.Group widths="equal">
            <Form.Field>
              <Input
                disabled={ sameAddress }
                onChange={ this.handleChange }
                value={ street }
                name="street1"
                placeholder="Street Address"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group width="equal">
            <Form.Field>
              <Input
                disabled={ sameAddress }
                onChange={ this.handleChange }
                value={ city }
                name="city"
                placeholder="City"
              />
            </Form.Field>
            <Form.Field width={ 6 }>
              <Dropdown
                disabled={ sameAddress }
                onChange={ this.handleChange }
                value={ state }
                options={ usStates }
                selection
                name="state_id"
                placeholder="State"
              />
            </Form.Field>
            <Form.Field width={ 4 }>
              <Input.ZipCode
                disabled={ sameAddress }
                onChange={ this.handleChange }
                value={ zip }
                name="zip"
                placeholder="Zip"
              />
            </Form.Field>
          </Form.Group>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default AddressInfoSection;