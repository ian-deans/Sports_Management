import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../actions/app"

const Logout = props => {
  props.logout();
  window.location.href = "/logout"
  return (
    <div></div>
  )
}

export default withRouter(connect(()=>{}, { logout })(Logout))
