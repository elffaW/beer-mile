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
import { Progress, Grid, Segment, Icon } from 'semantic-ui-react';

//helper statics
const COLORS = [ 'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black' ];
const PERCENT_COMPLETE = {
	1:0,	//start
	2:5,	//finish beer 1
	3:25,	//finish lap 1
	4:30,	//finish beer 2
	5:50,	//finish lap 2
	6:55,	//finish beer 3
	7:75,	//finish lap 3
	8:80,	//finish beer 4
	9:100	//finish lap 4 (race over)
}

class RunnerRow extends Component {
	constructor() {
		super();
	}

	render() {
		console.log(this.props.color);
		let pct = PERCENT_COMPLETE[this.props.runner.timelogs.length];
		console.log('percent complete: ' + pct)
		return (
			<Grid.Row>
				<Grid.Column width={3}>
					<Grid.Row>
						{this.props.runner.name}
					</Grid.Row>
					<Grid.Row>
						{this.props.runner.button.name}
					</Grid.Row>
				</Grid.Column>
				<Grid.Column width={13}>
					<Progress percent={pct} active progress inverted color={this.props.color}>
						TC LOSES
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
		model.get(['runnersList','length']).then( length => { console.log('num runners: ' + length); } );
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

		let runners = [];
		runners.push({
			id: 12,
			name: "Matt",
			button: {name:"poopbags"},
			timelogs: [
				{timestamp:"2017-07-21 18:30:00"},
				{timestamp:"2017-07-21 18:31:00"},
				{timestamp:"2017-07-21 18:34:00"}
			]
		});
		runners.push({
			id: 23,
			name: "Mike",
			button: {name:"dang"},
			timelogs: [
				{timestamp:"2017-07-21 18:30:01"},
				{timestamp:"2017-07-21 18:32:00"},
				{timestamp:"2017-07-21 18:35:00"},
				{timestamp:"2017-07-21 18:36:01"}
			]
		});
		runners.push({
			id: 24,
			name: "TC",
			button: {name:"stupid"},
			timelogs: [
				{timestamp:"2017-07-21 18:30:02"},
				{timestamp:"2017-07-21 18:35:00"}
			]
		});
		this.setState({runners:runners});
	}

	// componentWillReceiveProps(nextProps) {
	// 	model.get('test').
	// 		then( json => { 
	// 			console.log(json);
	// 		});
	// }

	render() {
		let runnerStatuses = [];
		let idx = 0;
		this.state.runners.forEach(runner => {
			runnerStatuses.push(
				<RunnerStatus runner={runner}
							  color={COLORS[idx % COLORS.length]} />
			);
			idx = idx + 1;
		});
		return (
			<Segment>
				<Grid columns={2} >
					{runnerStatuses}
					<Grid.Row>
						<Grid.Column width={3}>
							TC LOSES
						</Grid.Column>
						<Grid.Column width={13}>
							<Progress percent={35} active progress inverted color='green'>
								TC LOSES
							</Progress>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
							TC LOSES
						</Grid.Column>
						<Grid.Column width={13}>
							<Progress percent={95} active progress inverted color='blue'>
								TC LOSES
							</Progress>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
							TC LOSES
						</Grid.Column>
						<Grid.Column width={13}>
							<Progress percent={31} active progress inverted color='pink'>
								TC LOSES
							</Progress>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
							TC LOSES
						</Grid.Column>
						<Grid.Column width={13}>
							<Progress percent={19} active progress inverted color='black'>
								TC LOSES
							</Progress>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}
