import React from "react";
import { Route, Switch } from "react-router-dom";
import { PageNotFound, PageNotAvailable } from "../../../components/common";
import ProgramsTable from "../../../components/hq/programs/ProgramsTable";

const Programs = ( { match: { path } } ) => {
  return (
    <div className="page hq-programs">
      <Switch>
        <Route exact path={ path } component={ ProgramsTable } />
        <Route path={ path + "/new" } component={ PageNotAvailable } />
        <Route component={ PageNotFound } />
      </Switch>
    </div>
  );
};

export default Programs;
