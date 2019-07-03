import React from "react";
import { Route, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import { PageNotFound, PageNotAvailable } from "../../../Components/common";

import ProgramsTable from "../../../Components/hq/programs/ProgramsTable";

import { Grid } from "semantic-ui-react";


const Programs = ( { match: { path } }) => {
  return (
    <div className="page hq-programs">
      <Switch>
        <Route exact path={ path } component={ ProgramsTable } />
        <Route path={ path + "/new" } component={ PageNotAvailable } />
        <Route component={ PageNotFound } />
      </Switch>
    </div>
  )
};

export default Programs;
