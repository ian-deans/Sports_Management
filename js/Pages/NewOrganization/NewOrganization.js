import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Panel } from "../../components/common";

import { resetState, saveNewOrganization, saveNewLegalRepresentative } from "../../redux/modules/organizationSetup/dispatchers";
import { updateOrganizationContext } from "../../actions/app";
import { BusinessDetailsForm, LegalRepresentativeForm } from "../../components/forms";
import { dev } from "../../helpers/log";
import NewOrganizationComplete from "./NewOrganizationComplete";

// const BUSINESS_DETAILS = "business_details";
// const LEGAL_REPRESENTATIVE = "legal_representative";

class NewOrganization extends React.Component {

  state = {
    saving: false,
    step: 0,
    error: null,
  }

  componentDidMount() {
    //? No action needed due to blank fields?
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  saveOrganization = async () => {
    this.setState( { saving: true } );
    try {
      await this.props.saveNewOrganization();
      await this.props.updateOrganizationContext();
      this.setState( { saving: false, step: 1 } );

    } catch ( error ) {
      dev( error );
      this.setState( {saving: false, error: "Error occurred, check console."} );
    }
  };

  saveLegalRepresentative = async () => {
    this.setState( { saving: true } );
    try {
      await this.props.saveNewLegalRepresentative();
      this.setState( { saving: false, step: 2 } );
      dev( "Legal Rep successfully attached to organization. Redirect to organization hq?" );

    } catch ( error ) {
      dev( error );
      this.setState( {error: "Error occurred, check console.", saving: false} );
    }
  };

  renderForm = () => {
    const { step, saving } = this.state;

    switch ( step ) {
      case 0: {
        return (
          <BusinessDetailsForm
            save={this.saveOrganization}
            saving={saving}
          />
        )
        ;}

      case 1: {
        return (
          <LegalRepresentativeForm
            save={this.saveLegalRepresentative}
            saving={saving}
          />
        );
      }

      case 2: {
        return (
          <NewOrganizationComplete />
        );
      }
    }
  }

  render() {
    const { error } = this.state;

    return (
      <div className="page new-organization">
        <Panel.Group className="organization-setup-main">
          <Panel.Header text="New Organization" />
          <Panel.Item>
            {this.renderForm()}
            {error && ( <div>An error occurred, organization not saved.</div> )}
          </Panel.Item>
        </Panel.Group>
      </div>
    );
  }
}

const mapStateToProps = () => ( {
} );

const mapDispatchToProps = {
  resetState,
  saveNewOrganization,
  saveNewLegalRepresentative,
  updateOrganizationContext,
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( NewOrganization ) );
