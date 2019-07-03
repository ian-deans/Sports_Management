import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import { ErrorBoundary } from "../../Components/common";
import { NavMenu } from "../../Components/account";

import {
  Home,
  Household,
  NewHouseholdMember,
  Financials,
  Documents,
  Programs
} from "./index";

import {
  ACCOUNT_URL,
  ACCOUNT_HOUSEHOLD_URL,
  ACCOUNT_ADD_HOUSEHOLD_MEMBER_URL,
  ACCOUNT_PROGRAMS_URL,
  ACCOUNT_FINANCIALS_URL,
  ACCOUNT_DOCUMENTS_URL
} from "../../config/urls";


class Account extends React.Component {
  currentLocation = () => {
    return this.props.location.pathname.split("/").pop();
  };

  render() {
    const {
      match: { path },
      documents
    } = this.props;
    // const showMyPlayers = currentLocation === HOME;
    const currentLocation = this.currentLocation();

    return (
      <div className="section account">
        <div className="nav">
          <NavMenu
            path={path}
            currentLocation={currentLocation}
          />
        </div>
        <div className="main">
          <ErrorBoundary>
            <Switch>
              <Route exact path={ACCOUNT_URL} component={Home} />
              <Route exact path={ACCOUNT_HOUSEHOLD_URL} component={Household} />
              <Route
                path={ACCOUNT_ADD_HOUSEHOLD_MEMBER_URL}
                component={NewHouseholdMember}
              />
              <Route
                path={ACCOUNT_PROGRAMS_URL}
                component={Programs}
              />
              <Route
                path={ACCOUNT_FINANCIALS_URL}
                component={Financials}
              />
              <Route
                path={ACCOUNT_DOCUMENTS_URL}
                render={props => (
                  <Documents
                    {...props}
                    documents={documents}
                  />
                )}
              />
            </Switch>
          </ErrorBoundary>
        </div>


      </div>
    )

    return (
      <Grid className="account-page">
        <ErrorBoundary>
          <Grid.Column className="nav-col">
            <NavMenu
              path={path}
              currentLocation={currentLocation}
            />

            {/* <MyPlayersPanel show={showMyPlayers} /> */}
          </Grid.Column>

          <Grid.Column className="content-col">
            <Switch>
              <Route exact path={ACCOUNT_URL} component={Home} />
              <Route exact path={ACCOUNT_HOUSEHOLD_URL} component={Household} />
              <Route
                path={ACCOUNT_ADD_HOUSEHOLD_MEMBER_URL}
                component={NewHouseholdMemberForm}
              />
              <Route
                path={ACCOUNT_PROGRAMS_URL}
                component={Programs}
              />
              <Route
                path={ACCOUNT_FINANCIALS_URL}
                component={Financials}
              />
              <Route
                path={ACCOUNT_DOCUMENTS_URL}
                render={props => (
                  <Documents
                    {...props}
                    documents={documents}
                  />
                )}
              />
            </Switch>
          </Grid.Column>
        </ErrorBoundary>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.account.root.documents,
});



export default withRouter(
  connect(
    mapStateToProps,
  )(Account)
);
