import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IndyLapSpeedChart from './chartTypes/SpeedChart.js';
import OverallTimeChart from './chartTypes/eOverallTime.js';
//import runnerRawData from './chartTypes/chartData/frontEndData.js';





ReactDOM.render(<IndyLapSpeedChart />, document.getElementById('chart1'));
ReactDOM.render(<OverallTimeChart />, document.getElementById('chart2'));


