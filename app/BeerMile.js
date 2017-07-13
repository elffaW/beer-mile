import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import falcor from 'falcor';
import { model } from './model.js';

import { RunnerStatus } from './RunnerStatus';
/* EXAMPLE model call:
	- model imported above
	- get function tells falcor we want to just retrieve from the model
	- pass in the route to what you want in the JSON graph structure representing the data
	- model.get returns a Promise, so we handle it when it comes back if resolved with .then()
	- if Promise is rejected (failure), we handle it with .catch()

model.get(['thingsById', thingId, 'thingParam']).
  then(function(json) {
    if(json === undefined) { return; }
    //do stuff with the json (set state etc)
  }.bind(this)).	//bind this if needed inside .then function
  catch(function(err) {
	console.error('error retrieving thingParam from things ' + err);
  });

*/

// import UI elements
import { Button, Progress, Grid, Segment, Header, Icon } from 'semantic-ui-react';

//socketio for client-server communications (incl. data update without page refresh)
const io = require('socket.io-client');
const socket = io();

//order matters for overlapping styles - last one will take precedence
import 'semantic-ui-css/semantic.min.css';
import './styles/style.css';

export class BeerMile extends Component {
	constructor() {
		super();
		this.state = { socketMessage:'init' };
		socket.on('runnerCheckpoint', (update) => this.handleRunnerCheckpoint(update));
	}

	componentWillMount() {
		socket.emit('update', 'test');
		model.get('test').
			then( json => { 
				console.log(json);
			});
	}

	handleRunnerCheckpoint(update) {
		
	}

	render() {
		console.log(this.state.socketMessage);
		return (
			<div>
				<Header inverted textAlign="center" as='h2' icon>
					<Icon name='beer' />
					BEER MILE 2017
					<Header.Subheader>
						Current Time: ??? Free t-shirts provided by TC. Who loses.
					</Header.Subheader>
				</Header>
				<RunnerStatus />
			</div>
		);
	}
}

ReactDOM.render(<BeerMile />, document.getElementById('beermile'));
