import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Admin, Account, Hq, Logout, TestPage } from "./Pages";
import {
  ErrorBoundary,
  NavBar,
  Spinner,
  PageNotFound
} from "./Components/common";
import { ACCOUNT_URL, HQ_URL, ADMIN_URL, LOGOUT_URL, MOTD_URL } from "./config/urls";

import NewOrganization from "./Pages/NewOrganization/NewOrganization";


//! TODO: Add ProtectedRoute class for routes available only
//! under certain conditions.
class App extends React.Component {

  className = () => {
    const classes = ["main-app-layout"];

    const { location: { pathname } } = this.props;
    const inHqSection = pathname.split("/").includes("hq");

    if (inHqSection) {
      classes.push("hq");
    }

    return classes.join(" ");
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

    if (loading) {
      return <Spinner />
    }

    const className = this.className();

    return (
      <div className={className}>

        <div className="zone navbar">
          <NavBar
            userAvatar={userAvatar}
            userName={userName}
            orgLogo={organizationLogo}
            orgName={organizationName}
            path={path}
          />
        </div>

        <div className="zone content">
          <ErrorBoundary>
            <Switch>
              {/* NOTE: Possbile place to display general messages from cinch? */}
              <Route exact path={MOTD_URL} component={MOTD} />
              <Route path={ACCOUNT_URL} component={Account} />
              //* The route below should only be available to 
              //* users with a default organization context available.
              <Route path={HQ_URL} component={Hq} />
              <Route path={ADMIN_URL} component={Admin} />
              <Route path={LOGOUT_URL} component={Logout} />
              <Route path={"/app/test"} component={TestPage} />

              <Route path={"/app/new-organization"} component={NewOrganization} />
              <Route component={PageNotFound} />
            </Switch>
          </ErrorBoundary>
        </div>
      </div>
    )

  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  userAvatar: state.app.user_profile_image_path,
  userName: state.app.user_name,
  organizationName: state.app.organization_name,
  organizationLogo: state.app.organization_logo_image_path,
});

const mapDispatchToProps = {
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

//TODO: Move this component to its own file.
const MOTD = () => <div>{"Message of the Day from Cinch?"}</div>;
