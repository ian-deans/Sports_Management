import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ErrorBoundary, Panel } from '../../../Components/common';
import { capitalizeFirstLetter, lastInPath } from "../../../utilities";

import NavMenu from "../../../Components/hq/setup/NavMenu";
import * as views from ".";

import { loadOrganizationData } from "../../../actions/organizationSetup";
import { resetAllForms } from "../../../actions/forms";

const BUSINESS_DETAILS_URL = "/business-details";
const LEGAL_REPRESENTATIVE_URL = "/legal-representative";

class OrganizationSetup extends React.Component {

  componentDidMount() {
    //? May need some sort of condition around this call?
    //? Or leave it all up to the dispatcher?
    this.props.loadOrganizationData();
  };

  componentWillUnmount() {
    this.props.resetAllForms();
  }

  render() {
    const { match: { path } } = this.props;
    const currentView = lastInPath(this.props.location.pathname)
    const title = _title(currentView);


    return (
      <ErrorBoundary>
        <div className="page organization-setup">
          <div className="area-nav">
            <NavMenu current={currentView} path={path} />
          </div>
          <div className="area-main">
            <Panel.Group className="organization-setup-main">
              <Panel.Header text={title} />
              <Panel.Item>
                <Switch>
                  <Route exact path={path + BUSINESS_DETAILS_URL} component={views.BusinessDetails} />
                  <Route path={path + LEGAL_REPRESENTATIVE_URL} component={views.LegalRepresentative} />
                  <Route path={`${path}/proof-of-id`} component={views.ProofOfId} />
                  <Route path={`${path}/bank-information`} component={views.BankInfomation} />
                  {/* <Route path={`${path}/payment-method`} component={views.PaymentMethods} /> */}
                  <Route path={`${path}/adminstrators`} component={views.Administrators} />
                </Switch>
              </Panel.Item>
            </Panel.Group>
          </div>
        </div>
      </ErrorBoundary>
    )
  };

};

const mapStateToProps = state => ({
  // stepTitle: state.organizationSetup.root.step_title,
});

const mapDispatchToProps = {
  loadOrganizationData,
  resetAllForms,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganizationSetup));

function _title(pathname) {
  return capitalizeFirstLetter(pathname);
}