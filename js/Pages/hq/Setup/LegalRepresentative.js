import React from 'react';
import { connect } from "react-redux";
import { updateLegalRepresentative } from "../../../actions/organizationSetup"
import { LegalRepresentativeForm } from "../../../Components/forms";
import { ErrorBoundary } from "../../../Components/common";



class LegalRepresentative extends React.Component {
  state = {
    saving: false,
    error: null,
  };

  save = async () => {
    const {updateLegalRepresentative} = this.props;
    this.setState({ saving: true });

    try {
      await updateLegalRepresentative();
      this.setState({ saving: false });
    } catch (error) {
      console.error(error);
      this.setState({ error: "Error occurred, check console.", saving: false });
    }
  };

  render() {
    const { saving, error } = this.state;
    const props = { saving, save: this.save };
    return (
      <ErrorBoundary>
        <LegalRepresentativeForm {...props} />
      </ErrorBoundary>
    )
  };
};

const mapStateToProps = state => ({
  // data: state.organizationSetup.legal_representative,
});

const mapDispatchToProps = {
  updateLegalRepresentative,
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalRepresentative)