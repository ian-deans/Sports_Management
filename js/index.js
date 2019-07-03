import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ErrorBoundary } from "./Components/common";

import Root from "./Root";
import Login from "./Pages/Login";

import "./style/semantic.min.css";
import "./bootstrap";


const loginElement = document.getElementById("Login-Form");
const rootElement = document.getElementById("Main-App");

if (rootElement) {
  render(
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Root />
        </Router>
      </ErrorBoundary>
    </Provider>,
    rootElement
  );
} else if (loginElement) {
  render(
    <Login />,
    loginElement
  );
} else {
  console.log({
    error: {
      render: 'Elements with ids "Main-App" or "Login-Form" not found.'
    }
  });
}
