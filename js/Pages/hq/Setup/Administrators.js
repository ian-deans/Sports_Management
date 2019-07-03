import React from 'react';
import { connect } from "react-redux"
// import {  } from "../../../actions/organizationSetup";

// import { AdministratorsForm } from "../../../Components/common/OrganizationSetup/Forms";

class Administrators extends React.Component {

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
)(Administrators);