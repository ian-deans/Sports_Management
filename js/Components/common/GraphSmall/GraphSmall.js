import React from 'react';
import Chart from 'chart.js';

import { Panel } from '..';

import { chartOptions, chartData } from './config';
// import {Line as LineChart} from 'react-chartjs';
// import Ellipses from '../Ellipses';


class GraphSmall extends React.Component {
	componentDidMount() {
		this.prepChart()
	}

	prepChart = () => {
		let chartCanvas = this.refs.chart;

    let myChart = new Chart(chartCanvas, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });

    this.setState({chart: myChart})
	}

	render() {
		return (
			<Panel>
				<div className="options">
					{/* <Ellipses /> */}
				</div>
				<div className="header">{this.props.title}</div>
				<div className="body">
					<div className="labels">
						<p className="total">1:31</p>
						<p className="rate positive">+16.7%</p>
					</div>
					<div className="chart-container">
						<canvas ref={'chart'} height={'300'} width={'690'}></canvas>
					</div>
				</div>
			</Panel>
			// <div className="graph-small section">
			// </div>
		)
	}
};

export default GraphSmall;