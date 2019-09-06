import React from "react";
import Dropdown from "./Dropdown";
import { connect } from "react-redux";

const USStatesDropdown = ( { options, onChange } ) => {

  return (
    <Dropdown
      selection
      placeholder="State"
      options={ options }
      onChange={ onChange }
      pointing="right"
      className="component-dropdown-us-states"
    />
  );
};

const mapStateToProps = state => ( {
  options: state.ui.us_states
} );

export default connect( mapStateToProps )( USStatesDropdown );
