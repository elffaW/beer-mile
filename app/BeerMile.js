import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import falcor from 'falcor';
import { model } from './model.js';

// import UI elements
import { Header, Icon } from 'semantic-ui-react';

import { RunnerStatus } from './RunnerStatus';

import IndyLapSpeedChart from './chartTypes/SpeedChart.js';
import OverallTimeChart from './chartTypes/eOverallTime.js';

//socketio for client-server communications (incl. data update without page refresh)
const io = require('socket.io-client');
const socket = io();

//order matters for overlapping styles - last one will take precedence
import 'semantic-ui-css/semantic.min.css';
import './styles/style.css';

export class BeerMile extends Component {
	constructor() {
		super();
		this.state = { socketMessage:'init',
					   runners:[],
					   runnerSelected: 'MIKE' };
		socket.on('runnerCheckpoint', (update) => this.handleRunnerCheckpoint(update));
	}

	componentWillMount() {
		this.getRunnerDetails();
	}

	handleRunnerCheckpoint(update) {
		model.invalidate('runnersList');
		this.getRunnerDetails();
	}

	changeRunner = (runnerName) => {
		this.setState({ runnerSelected:runnerName });
	}

	getRunnerDetails() {
		//get runners here so we can pass to any other places that need it
		model.getValue(['runnersList','length']).then( length => { 
			model.get(['runnersList', {from:0,to:length-1}, ['id','name', 'button', 'timelog'], ['id','name', 'timestamp']]).
				then( json => {
					console.log('Found ' + length + ' runners');
					if(json === undefined) {
						console.log('no runners found');
						return;
					}
					let runnersList = json['json']['runnersList'];
					let runners = [];
					for(let r in runnersList) {
						runners.push(runnersList[r]);
					}
					this.setState({ runners:runners });
				});
			});
	}

	render() {
		
		return (
			<div>
				<Header inverted textAlign="center" as='h2' icon>
					<Icon name='beer' color="yellow" bordered circular/>
					BEER MILE 2017
					<Header.Subheader>
						Free t-shirts provided by TC. Who loses.
					</Header.Subheader>
				</Header>
				<RunnerStatus runners={this.state.runners}/>
				<IndyLapSpeedChart runners={this.state.runners} runnerSelected={this.state.runnerSelected} />
				<OverallTimeChart runners={this.state.runners} changeRunner={this.changeRunner} />
			</div>
		);
	}
}

ReactDOM.render(<BeerMile />, document.getElementById('beermile'));
