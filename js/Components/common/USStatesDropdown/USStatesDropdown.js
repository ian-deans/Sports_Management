import React from "react";
import {Dropdown} from "../index";
import {connect} from "react-redux";

const USStatesDropdown = props => {
  const {usStates, ...restProps} = props;
  return (
    <Dropdown 
      options={usStates} 
      {...restProps} 
    />
  )
}

const mapStateToProps = state => ({
  usStates: state.ui.usStates,
});

export default connect(mapStateToProps)(USStatesDropdown);