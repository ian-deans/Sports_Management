import React from "react"; /* disable no-unsused-vars*/
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/create";
import { ErrorBoundary } from "./components/common";
import { error } from "./helpers/log";
import Root from "./containers/Root/Root";
import { Login } from "./pages";


//TODO Add 'connected-react-router' as a redux binding for browser history.


const initialState = {};
const store = configureStore( initialState );

const loginElement = document.getElementById( "Login-Form" );
const rootElement = document.getElementById( "Main-App" );

const renderApp = () => {
  require( "./style/semantic.min.css" );
  require( "./bootstrap" );

  const WrappedApp = () => (
    <Provider store={ store }>
      <ErrorBoundary>
        <Router>
          <Root />
        </Router>
      </ErrorBoundary>
    </Provider>
  );

  if ( rootElement ) {
    render( <WrappedApp />, rootElement );

  } else if ( loginElement ) {
    render( <Login />, loginElement );

  } else {
    error( {
      message: {
        render: "Elements with ids 'Main-App' or 'Login-Form' not found."
      }
    } );
  }
};

renderApp();
