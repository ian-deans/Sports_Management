import React from 'react';
import { connect } from "react-redux";
import { updateBusinessDetails } from "../../../actions/organizationSetup";
import { updateField } from "../../../actions/forms";
import { BusinessDetailsForm } from "../../../Components/forms";
import { ErrorBoundary } from "../../../Components/common";

class BusinessDetails extends React.Component {

  BUSINESS_DETAILS = "business_details";

  state = {
    saving: false,
    error: null,
  };

  save = async () => {
    const { updateBusinessDetails } = this.props;
    this.setState({ saving: true });

    try {
      await updateBusinessDetails();
      this.setState({ saving: false })
    } catch (error) {
      console.error(error)
      this.setState({ error: "Error occurred. Check console.", saving: false });
    };
  };

  handleChange = (event, data) => {
    this.props.updateField(this.BUSINESS_DETAILS, data.name, data.value)
  };

  render() {
    // const { data } = this.props;
    const { saving, error } = this.state;
    const props = {
      saving,
      save: this.save,
    };
    return (
      <ErrorBoundary>
        <BusinessDetailsForm {...props} />
        {this.state.error}
      </ErrorBoundary>
    )
  }
};

const mapStateToProps = state => ({
  // data: state.forms.business_details,
});

const mapDispatchToProps = {
  updateField,
  updateBusinessDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDetails);