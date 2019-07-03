import React from "react";
import Dropdown from "./Dropdown";
import { connect } from "react-redux";

const AffiliatesDropdown = ({options, onChange}) => {

  return (
    <Dropdown
      selection
      placeholder="Affiliation"
      options={options}
      onChange={onChange}
      className="component-dropdown-sports"
    />
  )
};

const mapStateToProps = state => ({
  options: state.ui.affiliates,
});

export default connect(mapStateToProps)(AffiliatesDropdown);
