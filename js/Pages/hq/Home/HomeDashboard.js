import React from "react";
import { Progress } from "semantic-ui-react";
import DashboardStats from "../../../Components/hq/home/DashboardStats/DashboardStats";

import {ErrorBoundary, KeyPerformanceIndicators, Panel } from "../../../Components/common";

class HomeDashboard extends React.Component {
  render() {
    return (
      <div className="page hq-home">
        <div className="area-stats">
          <DashboardStats />
        </div>
        <div className="area-graph">
          <KeyPerformanceIndicators />
        </div>
        <div className="area-registrations">
          <ProgramRegistrationsIndicators />
        </div>
      </div>
    );
  };
};

export default HomeDashboard;




/** To be abstracted out */

const ProgramRegistrationsIndicators = props => (
  <Panel.Group className="program-registration-indicators">
    <Panel.Item>
      <h3>Current Program Registration Levels</h3>
    </Panel.Item>
    <ProgramRegistrationsIndicator name="Recreational" percent={ 98 } />
    <ProgramRegistrationsIndicator name="Camps" percent={ 98 } />
    <ProgramRegistrationsIndicator name="Competitive" percent={ 98 } />
    <Panel.Item>
      Spring Shooting <span><Progress percent={ 56 } size="small" color="blue" progress /></span>
    </Panel.Item>
    <Panel.Item>
      Recreational <span><Progress percent={ 46 } size="small" color="blue" progress /></span>
    </Panel.Item>
  </Panel.Group>
);

const ProgramRegistrationsIndicator = props => (
  <Panel.Item>
    <span className="flexbox aligned center">
      { props.name }
      <Progress
        className="buffer-left program-registration-indicator"
        progress
        percent={ props.percent }
        size="small"
        color="blue"
      />
    </span>
  </Panel.Item>
);