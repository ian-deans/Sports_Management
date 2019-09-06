import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { logoPath } from "../../../config/imagePaths";

const cinchLogo = logoPath + "cinch-white-alt.png";

const LoginForm = () => {
  const loginUrl = window.location.origin + "/login";
  const csrfToken = sessionStorage.getItem( "CSRF-TOKEN" );
  return (
    <div className="flexbox column aligned-center justified-center">
      <img src={ cinchLogo } />
      <Form method="POST" action={ loginUrl } autoComplete="on">
        <input type="hidden" name="_token" value={ csrfToken } />
        <Form.Field required>
          <label>Username</label>
          <Input name="email" type="email" />
        </Form.Field>
        <Form.Field required>
          <label>Password</label>
          <Input name="password" type="password" />
        </Form.Field>
        <Form.Field className="flexbox aligned-center justified-center">
          <Button color="black" type="submit">Login</Button>
        </Form.Field>
      </Form>
    </div>
  );
};

export default LoginForm;