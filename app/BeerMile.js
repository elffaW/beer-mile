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
import { Header, Icon } from 'semantic-ui-react';

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
		this.getRunnerDetails();
	}

	handleRunnerCheckpoint(update) {
		this.getRunnerDetails();
	}

	getRunnerDetails() {
		//get runners here so we can pass to any other places that need it
		model.getValue(['runnersList','length']).then( length => { 
			model.get(['runnersList', {from:0,to:length-1}, ['id','name', 'button', 'timelog'], ['id','name', 'timestamp']]).
				then( json => {
					console.log('returned from getting runners');
					console.log('Found ' + length + ' runners');
					console.log(JSON.stringify(json,null,2));
					if(json === undefined) {
						console.log('no runners found');
						return;
					}
					let runnersList = json['json']['runnersList'];
					let runners = [];
					for(let r in runnersList) {
						console.log(runnersList[r]);
						runners.push(runnersList[r]);
					}
					this.setState({ runners:runners});
				});
			});
		
		// let runners = [
		// 	{
		// 		id: 12,
		// 		name: "Matt",
		// 		button: {id:1, name:"poopbags",timelog: [
		// 			{timestamp:new Date("2017-07-21 18:30:12")},
		// 			{timestamp:new Date("2017-07-21 18:31:41")},
		// 			{timestamp:new Date("2017-07-21 18:34:52")}
		// 		]},
		// 		
		// 	}, {
		// 		id: 23,
		// 		name: "Mike",
		// 		button: {id:2, name:"dang"},
		// 		timelog: [
		// 			{timestamp:new Date("2017-07-21 18:30:32")},
		// 			{timestamp:new Date("2017-07-21 18:32:56")},
		// 			{timestamp:new Date("2017-07-21 18:35:11")},
		// 			{timestamp:new Date("2017-07-21 18:36:01")}
		// 		]
		// 	}, {
		// 		id: 24,
		// 		name: "TC",
		// 		button: {id:3, name:"stupid"},
		// 		timelog: [
		// 			{timestamp:new Date("2017-07-21 18:30:02")},
		// 			{timestamp:new Date("2017-07-21 18:35:53")}
		// 		]
		// 	}, {
		// 		id: 25,
		// 		name: "Jay",
		// 		button: {id:4, name:"poof"},
		// 		timelog: [
		// 			{timestamp:new Date("2017-07-21 18:30:32")},
		// 			{timestamp:new Date("2017-07-21 18:32:56")},
		// 			{timestamp:new Date("2017-07-21 18:35:11")},
		// 			{timestamp:new Date("2017-07-21 18:36:01")}
		// 		]
		// 	}, {
		// 		id: 26,
		// 		name: "Caroline",
		// 		button: {id:5, name:"milk baby"},
		// 		timelog: [
		// 			{timestamp:new Date("2017-07-21 18:30:32")},
		// 			{timestamp:new Date("2017-07-21 18:32:56")},
		// 			{timestamp:new Date("2017-07-21 18:35:11")},
		// 			{timestamp:new Date("2017-07-21 18:37:56")},
		// 			{timestamp:new Date("2017-07-21 18:38:11")},
		// 			{timestamp:new Date("2017-07-21 18:39:01")}
		// 		]
		// 	}, {
		// 		id: 27,
		// 		name: "JR",
		// 		button: {id:6, name:"bai"},
		// 		timelog: [
		// 			{timestamp:new Date("2017-07-21 18:30:32")},
		// 			{timestamp:new Date("2017-07-21 18:31:56")},
		// 			{timestamp:new Date("2017-07-21 18:32:11")},
		// 			{timestamp:new Date("2017-07-21 18:33:56")},
		// 			{timestamp:new Date("2017-07-21 18:34:11")},
		// 			{timestamp:new Date("2017-07-21 18:35:56")},
		// 			{timestamp:new Date("2017-07-21 18:36:11")},
		// 			{timestamp:new Date("2017-07-21 18:37:11")},
		// 			{timestamp:new Date("2017-07-21 18:39:01")}
		// 		]
		// 	}
		// ];
		// this.setState({runners:runners});
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
			</div>
		);
	}
}

ReactDOM.render(<BeerMile />, document.getElementById('beermile'));
