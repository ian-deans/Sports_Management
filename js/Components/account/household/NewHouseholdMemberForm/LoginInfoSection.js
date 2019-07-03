import React from "react";
import { Grid, Form } from 'semantic-ui-react';
import { Header } from '../../../common';

class LoginInfoSection extends React.Component {
  handleChange = (event, data) => {
    this.props.handleChangeFn("loginData", data);
  };

  render() {
    const { email, phone_number, sendInvite, disabled } = this.props;
    return (
      <Grid.Row columns="equal" className="form-section">
        <Grid.Column stretched width={3}>
          <Header as="h5">Login</Header>
        </Grid.Column>

        <Grid.Column>
          <Form.Group widths={2}>
            <Form.Input
              disabled={disabled}
              width={8}
              value={email}
              onChange={this.handleChange}
              type="email"
              name="email"
              placeholder="Email Address"
            />
            <Form.Input
              disabled={ disabled }
              width={8}
              value={phone_number}
              onChange={this.handleChange}
              type="number"
              name="phoneNumber"
              placeholder="Mobile Number"
            />
          </Form.Group>

          <Form.Group widths={3} className="buffer-top">
            <Form.Checkbox 
              disabled={disabled}
              label="Send Invite"
              name="sendInvite"
              checked={ sendInvite }
              onChange={ this.handleChange }
            />
          </Form.Group>
        </Grid.Column>
      </Grid.Row>
    );
  }
};

export default LoginInfoSection;
