import React from "react";
import { LoginForm } from "../Components/common";

const Login = props => {

  // const { loading } = this.state;
  return (
    <div className="page login">
      <div className="area-login-form">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;