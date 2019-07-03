import React from 'react';
import { connect } from "react-redux"
// import {  } from "../../../actions/organizationSetup";

// import { BankInformationForm } from "../../../Components/common/OrganizationSetup/Forms";

class BankInformation extends React.Component {

  state = {
    saving: false,
    error: null,
  };

  save = async () => {};

  handleChange = () => {};

  render() {
    return (
      <div></div>
    )
  }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BankInformation);