import React from "react";
import { connect } from "react-redux";
import { Statistic } from "semantic-ui-react";
import { CircularIcon, Panel, SmallSpinner } from "../../../common";
import { getDashboardStats } from "../../../../actions/hq";


class DashboardStats extends React.Component {

  state = {
    loading: true,
  }

  componentDidMount() {
    this.init();
  };

  init = async () => {
    await this.props.getDashboardStats();
    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state;
    const { stats } = this.props;

    const classes = [
      "flexbox",
      "aligned-center",
    ];
    const containerClasses = [
      ...classes,
      "justified-space-around",
      "component-hg-dashboard-stats"]
      ;
    const statClasses = [
      ...classes,
      "justified-center"
    ];

    const iconProps = {
      size: "large",
      loading,
      fitted: true,
    };

    const statProps = {
      size: "tiny",
      className: "cinch org-stat",
    };

    return (
      <Panel className={containerClasses.join(" ")}>

        <div className={statClasses.join(" ")}>
          <CircularIcon {...iconProps} color="green" name="shopping cart" />
          <Statistic {...statProps}>
            <Statistic.Value>{formatLargeNumber(stats.total_registrations)}</Statistic.Value>
            <Statistic.Label>Total Registrations</Statistic.Label>
          </Statistic>
        </div>

        <div className={statClasses.join(" ")}>
          <CircularIcon {...iconProps} color="purple" name="dollar" />
          <Statistic {...statProps}>
            <Statistic.Value>${formatLargeNumber(stats.annual_income)}</Statistic.Value>
            <Statistic.Label>Annual Income</Statistic.Label>
          </Statistic>
        </div>

        <div className={statClasses.join(" ")}>
          <CircularIcon {...iconProps} color="blue" name="users" />
          <Statistic {...statProps}>
            <Statistic.Value>{formatLargeNumber(stats.total_members)}</Statistic.Value>
            <Statistic.Label>Total Members</Statistic.Label>
          </Statistic>
        </div>

        <div className={statClasses.join(" ")}>
          <CircularIcon {...iconProps} color="red" name="eye" />
          <Statistic {...statProps}>
            <Statistic.Value>{formatLargeNumber(stats.active_programs)}</Statistic.Value>
            <Statistic.Label>Active Programs</Statistic.Label>
          </Statistic>
        </div>

      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  stats: state.hq.root.dashboard_stats,
});

const mapDispatchToProps = {
  getDashboardStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStats);


function formatLargeNumber(amount) {
  if (!amount) {
    return;
  }


  let chars = amount.toString().split("");
  let final = [];
  while(chars.length > 3) {
    let a = chars.splice(chars.length - 3);
    final = [",", ...a, ...final];
  }
  final = [...chars, ...final];
  return final.join("");
}


function dividesBy3(number) {
  return number % 3 === 0;
}