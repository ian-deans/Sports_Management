import React from "react";
import Chart from "chart.js";
import { Grid } from 'semantic-ui-react';
import { Panel } from "..";
import ChartLink from './ChartLink';

import { indicatorsData, chartData } from "./config";


const _arrayOfIndicators = (indicatorsData, clickFn, currentTab) =>
  indicatorsData.map((indicatorData, i) => (
    <ChartLink
      key={i}
      {...indicatorData}
      active={indicatorData.label === currentTab}
      handleClick={clickFn}
    />
  ));


class KeyPerformanceIndicators extends React.Component {
  state = {
    currentTab: "Revenue",
    chart: null
  };

  componentDidMount() {
    this.changeChart(indicatorsData[0].data, indicatorsData[0].labels);
  }

  changeChart = (data, labels) => {
    let chartCanvas = this.refs.chart;
    let chartStuff = chartData( data, labels );

    let chart = new Chart(chartCanvas, {
      type: "line",
      data: chartStuff.data,
      options: chartStuff.options
    });

    this.setState({ chart });
  };


  render() {
    const { currentTab } = this.state;
    const _indicators = _arrayOfIndicators(
      indicatorsData,
      this.handleClick,
      currentTab
    );

    return (
      <Panel.Group>
        <Panel.Header text="Key Performance Indicators" />
        <Panel.Item>
          <Grid stretched columns="equal">

            <Grid.Column width={ 3 }>
              <Panel.Group>
                { _indicators }
              </Panel.Group>
            </Grid.Column>

            <Grid.Column className="see_me">
              <div className="graph">
                <canvas ref={"chart"} height={"300"} width={"690"} />
              </div>
            </Grid.Column>

          </Grid>
        </Panel.Item>
      </Panel.Group>
    );
  }
}

export default KeyPerformanceIndicators;
