import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as pages from "./pages";
import {
  ErrorBoundary,
  NavBar,
  Spinner,
  PageNotFound
} from "./components/common";
import { ACCOUNT_URL, HQ_URL, ADMIN_URL, LOGOUT_URL, MOTD_URL } from "./config/urls";

// import NewOrganization from "./Pages/NewOrganization/NewOrganization";
import "./App.less";

import API from "./api/Api";

class App extends React.Component {

  className = () => {
    const classes = [ "main-app-layout" ];

    const { location: { pathname } } = this.props;
    const inHqSection = pathname.split( "/" ).includes( "hq" );

    if ( inHqSection ) {
      classes.push( "hq" );
    }

    return classes.join( " " );
  }

  render() {
    const {
      loading,
      match: { path },
      userAvatar,
      userName,
      organizationName,
      organizationLogo,
    } = this.props;

    if ( loading ) {
      return <Spinner />;
    }

    const className = this.className();

    return (
      <div className={ className }>

        <div className="zone navbar">
          <NavBar
            userAvatar={ userAvatar }
            userName={ userName }
            orgLogo={ organizationLogo }
            orgName={ organizationName }
            path={ path }
          />
        </div>

        <div className="zone content">
          <ErrorBoundary>
            <Switch>
              <Route path="/services/stripe/new_bank_account" component={ stripeAddBankAccountHandler } />

              {/* NOTE: Possbile place to display general messages from cinch? */ }
              <Route exact path={ MOTD_URL } component={ MOTD } />
              <Route path={ ACCOUNT_URL } component={ pages.Account } />
              <Route path={ HQ_URL } component={ pages.Hq } /> //TODO refactor to a protected route that requires the user have an organization context available.
              <Route path={ ADMIN_URL } component={ pages.Admin } />
              <Route path={ LOGOUT_URL } component={ pages.Logout } />
              <Route component={ PageNotFound } />


            </Switch>
          </ErrorBoundary>
        </div>
      </div>
    );

  }
}
/* eslint-disable camelcase */
function stripeAddBankAccountHandler( props ) {
  const query = new URLSearchParams( props.location.search );
  const code = query.get( "code" );
  localStorage.setItem( "stripe_newBankAccountCode", code );

  const payload = {
    data: {
      authorization_code: code,
      is_default: true,
    }
  };

  API.organizationSetup.addBankAccount( payload );
  return <Redirect to="/app/hq/setup/" />;
}

const mapStateToProps = state => ( {
  loading: state.app.loading,
  userAvatar: state.app.user_profile_image_path,
  userName: state.app.user_name,
  organizationName: state.app.organization_name,
  organizationLogo: state.app.organization_logo_image_path,
} );

const mapDispatchToProps = {
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )( App )
);

//TODO: Move this component to its own file.
const MOTD = () => <div>{ "Message of the Day from Cinch?" }</div>;
