import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "./Components/common";
import App from "./App";
import { loadUIData, loadUser } from './actions/app';

// import "./style/semantic.min.css";
// import "./bootstrap";

class Root extends React.Component {

  componentDidMount() {
    this.init();
  }
  
  init = async () => {
    this.loadUIData();
    this.loadUser();
  }

  loadUIData = () => {
    return this.props.loadUIData();
  }

  loadUser = () => {
    return this.props.loadUser();
  }

  render() {
    const {user} = this.props;
    return user ? <App /> : <Spinner />;
  };
}

const mapStateToProps = state => ({
  user: state.app.user,
  // loading: state.app.loading,
});

const mapDispatchToProps = {
  loadUIData,
  loadUser,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Root)
);