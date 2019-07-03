import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import {
  Header,
  Panel,
  PageNotFound,
  ErrorBoundary
} from "../../../Components/common";
import { SelectHousehold } from "../../../Components/hq/households";

import Family from "./Family";
import OrderHistory from "./OrderHistory";
import Documents from "./Documents";

class Household extends React.Component {
  render() {
    const {
      match: { path },
      location: { pathname },
    } = this.props;

    const currentLocation = pathname.split("/").pop();

    return (
      <div className="page hq-households">
        <div className="area-nav">
          <NavPanel
            currentLocation={currentLocation}
            path={path}
          />
        </div>
        <div className="area-main">
          <ErrorBoundary>
            <Switch>
              <Route exact path={path} component={Family} />
              <Route path={path + "/order-history"} component={OrderHistory} />
              <Route path={path + "/documents"} component={Documents} />
              <Route component={PageNotFound} />
            </Switch>
          </ErrorBoundary>
        </div>

      </div>
    )

    return (
      <React.Fragment>
        <Grid.Row>
        </Grid.Row>
      </React.Fragment>
    );
  }
};

export default Household;

const NavPanel = ({ currentLocation, path }) => (
  <Panel>
    <Panel.Header>
      <div className="full-width flexbox justified-space-between" >
        <div className="flexbox aligned-center ">
        <NavLabel
          path={path}
          active={currentLocation === "households"}
          name="Family"
          />
        <NavLabel
          path={path + "/order-history"}
          active={currentLocation === "order-history"}
          name="Order History"
          />
        <NavLabel
          path={path + "/documents"}
          active={currentLocation === "documents"}
          name="Documents"
          />
        </div>
        <div className="flexbox aligned-center justified-center component-hq-select-household">
          <SelectHousehold />
        </div>
      </div>
    </Panel.Header>
  </Panel>
);

const NavLabel = ({ active, name, path }) => (
  <div className="buffer-right">
    <Link to={path}>
      <Header color={active ? "blue" : "grey"}>{name}</Header>
    </Link>
  </div>
);
