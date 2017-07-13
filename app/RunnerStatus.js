import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import falcor from 'falcor';
import { model } from './model.js';
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
import { Header, Progress, Grid, Segment, Icon } from 'semantic-ui-react';

//helper statics
const COLORS = [ 'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black' ];
const PERCENT_COMPLETE = {
	1: { percent:0, message: "Drinking beer 1!" },	//start
	2: { percent:5, message: "Running Lap 1!" },	//finish beer 1
	3: { percent:25, message: "Drinking beer 2!" },	//finish lap 1
	4: { percent:30, message: "Running lap 2!" },	//finish beer 2
	5: { percent:50, message: "Drinking beer 3!" },	//finish lap 2
	6: { percent:55, message: "Running lap 3!" },	//finish beer 3
	7: { percent:75, message: "Drinking beer 4!" },	//finish lap 3
	8: { percent:80, message: "Running lap 4!" },	//finish beer 4
	9: { percent:100, message: "Finished!" }		//finish lap 4 (race over)
}

function msToTime(millis) {
	let sec = parseInt(millis/1000) % 60;
	let min = parseInt(millis/(1000*60)) % 60;
	
	sec = (sec < 10) ? '0' + sec : sec;

	return min + ':' + sec;
}


class RunnerRow extends Component {
	constructor() {
		super();
	}

	/* format milliseconds as minutes:seconds 
	 *	output: MM:ss or M:ss if minutes < 10
	*/
	
	render() {
		let numCheckpoints = this.props.runner.timelogs.length;
		let progress = PERCENT_COMPLETE[numCheckpoints];
		//assumption that timelogs are in order is probably false... should sort first
		let elapsedTime = Math.abs(this.props.runner.timelogs[numCheckpoints-1].timestamp - this.props.runner.timelogs[0].timestamp);
		let progressMsg = progress.message + ' (last checkpoint at ' + msToTime(elapsedTime) + ')';	//add time of last checkpoint

		return (
			<Grid.Row>
				<Grid.Column width={2}>
					<Grid.Row>
						{this.props.runner.name}
					</Grid.Row>
					<Grid.Row>
						[{this.props.runner.button.name}]
					</Grid.Row>
				</Grid.Column>
				<Grid.Column width={14}>
					<Progress percent={progress.percent} active progress inverted color={this.props.color}>
						{progressMsg}
					</Progress>
				</Grid.Column>
			</Grid.Row>
		);
	}
}

export class RunnerStatus extends Component {
	constructor() {
		super();
		this.state = { runners: [] };
	}

	componentWillMount() {
		// model.get(['runnersList','length']).then( length => { console.log('num runners: ' + length); } );
			// model.get(['runnersList', {from:0,to:length-1}, ['name', 'button', 'timelogs'], ['name', 'timestamp']])}).
			// 	then( json => {
			// 		if(json === undefined) {
			// 			console.log('no runners found');
			// 			return;
			// 		}
			// 		let runnersList = json['runnersList'];
			// 		let runners = [];
			// 		for(let r in runnersList) {
			// 			console.log(runnersList[r]);
			// 			runners.push(runnersList[r]);
			// 		}
			// 		this.setState({ runners:runners});
			// 	});
		
		let runners = [
			{
				id: 12,
				name: "Matt",
				button: {name:"poopbags"},
				timelogs: [
					{timestamp:new Date("2017-07-21 18:30:12")},
					{timestamp:new Date("2017-07-21 18:31:41")},
					{timestamp:new Date("2017-07-21 18:34:52")}
				]
			}, {
				id: 23,
				name: "Mike",
				button: {name:"dang"},
				timelogs: [
					{timestamp:new Date("2017-07-21 18:30:32")},
					{timestamp:new Date("2017-07-21 18:32:56")},
					{timestamp:new Date("2017-07-21 18:35:11")},
					{timestamp:new Date("2017-07-21 18:36:01")}
				]
			}, {
				id: 24,
				name: "TC",
				button: {name:"stupid"},
				timelogs: [
					{timestamp:new Date("2017-07-21 18:30:02")},
					{timestamp:new Date("2017-07-21 18:35:53")}
				]
			}
		];
		this.setState({runners:runners});
	}

	render() {
		let runnerStatuses = [];
		let idx = 0;
		this.state.runners.forEach(runner => {
			runnerStatuses.push(
				<RunnerRow runner={runner}
						   color={COLORS[idx % COLORS.length]} />
			);
			idx = idx + 1;
		});
		//calculate elapsed time from start (now minus first check-in of first runner [good enough])
		let curTime = Math.abs(new Date() - this.state.runners[0].timelogs[0].timestamp);
		curTime = msToTime(curTime);
		return (
			<Segment>
				<Grid columns={2} padded verticalAlign="top">
					<Grid.Row>
						<Header inverted textAlign="center" as='h3' icon>
							Elapsed Time: {curTime}
						</Header>
					</Grid.Row>
					{runnerStatuses}
				</Grid>
			</Segment>
		);
	}
}
