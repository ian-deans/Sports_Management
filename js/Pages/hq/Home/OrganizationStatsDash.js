import React from "react";
import { Statistic, Grid } from "semantic-ui-react";
import { CircularIcon, Panel } from "../../../Components/common";

const OrganizationStat = ({ icon, value, label }) => (
  <div className="flexbox aligned center justified center dash-stat">
    <CircularIcon icon={icon} />
    <Statistic size="tiny" className="cinch org-stat">
      <Statistic.Value>{value}</Statistic.Value>
      <Statistic.Label>{label}</Statistic.Label>
    </Statistic>
  </div>
);

const OrganizationStatsDash = ( { stats } ) => {

  const _stats = stats.map((stat, i) => {
    return (
      // <Grid.Column key={i}>
      <OrganizationStat
          key={ i }
          icon={stat.icon}
          label={stat.label}
          value={ stat.value }
        />
      // {/* </Grid.Column> */}
    );
  });

  return (
    <Panel className="flexbox aligned center justified space-between organization-stats-dash">
      {/* <Grid columns="equal"> */}
      { _stats }
        {/* </Grid> */}
    </Panel>
  );
};

export default OrganizationStatsDash;
