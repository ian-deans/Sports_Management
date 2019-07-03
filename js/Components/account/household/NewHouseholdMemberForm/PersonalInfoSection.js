import React from "react";
import { Form, Grid, Image, Input } from 'semantic-ui-react';
import { Dropdown } from '../../../common';
import ProfileImage from "./ProfileImage";


class PersonalInfoSection extends React.Component {

  handleChange = ( event, data ) => {
    this.props.handleChangeFn( 'personalData', data )
  };
  
  render() {
    const {
      first_name,
      last_name,
      gender,
      birthdate,
      genderOptions
    } = this.props;
    return (
      <Grid.Row columns="equal" className="form-section">
        <Grid.Column stretched width={3}>
          <div>
            <ProfileImage />
          </div>
        </Grid.Column>

        <Grid.Column>
          <Form.Group widths={2}>
            <Form.Input
              width={8}
              onChange={this.handleChange}
              value={first_name}
              name="first_name"
              required
              placeholder="First Name"
            />
            <Form.Input
              width={8}
              value={last_name}
              onChange={this.handleChange}
              name="last_name"
              required
              placeholder="Last Name"
            />
          </Form.Group>

          <Form.Group widths={2}>
            <Form.Field>
              <Dropdown 
                options={genderOptions}
                onChange={this.handleChange}
                value={gender}
                name="gender"
                selection
                required
                placeholder="Gender"
              />
            </Form.Field>
            <Form.Field
              control={Input}
              value={birthdate}
              onChange={this.handleChange}
              type="date"
              name="birthdate"
              required
              placeholder={birthdate}
            />
          </Form.Group>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default PersonalInfoSection;