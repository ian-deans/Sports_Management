import React from "react";
import Dropdown from "./Dropdown";
import { connect } from "react-redux";

const SportTypesDropdown = ({options, onChange}) => {

  return (
    <Dropdown
      selection
      placeholder="Sport"
      options={options}
      onChange={onChange}
      className="component-dropdown-sports"
    />
  )
};

const mapStateToProps = state => ({
  options: state.ui.sport_types,
});

export default connect(mapStateToProps)(SportTypesDropdown);
