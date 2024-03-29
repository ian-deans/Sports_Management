import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProgramSearch } from "../../../components/account/ProgramSearch";
import { ProgramDetails, ProgramSearchResults } from "./index";
import PlayerResgistrationPage from "./PlayerRegistrationPage";
import { ACCOUNT_PROGRAMS_URL } from "../../../config/urls";
import "./Programs.less";

const Programs = props => {
  const { location: { pathname } } = props;
  const currentView = pathname.split( "/" ).pop();
  const showSearch = currentView !== "register";

  return (
    <div className="page account-programs">
      { showSearch && (
        <div className="area-programs-search">
          <ProgramSearch />
        </div>
      ) }
      <div className="area-programs-content">
        <Switch>
          <Route
            exact
            path={ ACCOUNT_PROGRAMS_URL }
            component={ ProgramSearchResults }
          />
          <Route
            path={ ACCOUNT_PROGRAMS_URL + "/:programId/details" }
            component={ ProgramDetails }
          />
          <Route
            path={ ACCOUNT_PROGRAMS_URL + "/:programId/register" }
            component={ PlayerResgistrationPage }
          />
        </Switch>
      </div>
    </div>
  );
};

export default Programs;