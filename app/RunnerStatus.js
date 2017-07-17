import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import falcor from 'falcor';
import { model } from './model.js';

// import UI elements
import { Header, Progress, Grid, Segment } from 'semantic-ui-react';

//helper statics
const COLORS = [ 'red', 'violet', 'yellow', 'brown', 'green', 'blue', 'purple', 'orange', 'pink', 'olive', 'grey', 'teal' ];
const PERCENT_COMPLETE = {
	0: { percent:0, message: "Not even started!" },	//pre-start
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

/* format milliseconds as minutes:seconds 
 *	output: MM:ss or M:ss if minutes < 10
 */
function msToTime(millis) {
	let sec = parseInt(millis/1000) % 60;
	let min = parseInt(millis/(1000*60)) % 60;
	
	sec = (sec < 10) ? '0' + sec : sec;

	return min + ':' + sec;
}

class ElapsedTime extends Component {
	constructor() {
		super();
		this.state = {
			curTime:''
		};
	}

	componentWillMount() {
		this.getCurTime();
	}

	componentDidMount() {
		window.setInterval(function() {
			this.getCurTime();
		}.bind(this), 1000);
	}

	getCurTime() {
		let curTime = Math.abs(new Date().getTime() - this.props.firstCheckin.getTime());

		this.setState({curTime:msToTime(curTime)});
	}

	render() {
		//calculate elapsed time from start (now minus first check-in of first runner [good enough])
		
		return (
			<Grid.Row>
				<Header inverted textAlign="center" as='h3' icon>
					Elapsed Time: {this.state.curTime}
				</Header>
			</Grid.Row>
		);
	}
}

class RunnerRow extends Component {
	constructor() {
		super();
	}

	render() {
		
		let numCheckpoints = this.props.runner.timelog.length;
		console.log('numCheckpoints: ' + numCheckpoints);
		let progressMsg = '';
		let percent = 0;
		//assumption that timelogs are in order is probably false... should sort first
		if(numCheckpoints > 0 && numCheckpoints <= 9) {
			let elapsedTime = Math.abs(new Date(this.props.runner.timelog[numCheckpoints-1].timestamp).getTime() - new Date(this.props.runner.timelog[0].timestamp).getTime());
			let progress = PERCENT_COMPLETE[numCheckpoints];
			progressMsg = progress.message + ' (last checkpoint at ' + msToTime(elapsedTime) + ')';	
			percent = progress.percent;
		} 
		if(numCheckpoints >= 9) {
			let elapsedTime = Math.abs(new Date(this.props.runner.timelog[8].timestamp).getTime() - new Date(this.props.runner.timelog[0].timestamp).getTime());
			progressMsg = 'Finished! (FINAL TIME: ' + msToTime(elapsedTime) + ')';
			percent = 100;
		} 
		return (
			<Grid.Row>
				<Grid.Column width={2}>
					<Grid.Row>
						<strong>{this.props.runner.name}</strong>
					</Grid.Row>
					<Grid.Row>
						<i>[{this.props.runner.button.name}]</i>
					</Grid.Row>
				</Grid.Column>
				<Grid.Column width={14}>
					<Progress percent={percent} active progress inverted color={this.props.color} autoSuccess>
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
	}

	componentWillMount() {
		
	}

	render() {
		let firstCheckin = new Date();	//default in case there are no runners
		let runnerStatuses = [];
		let idx = 0;
		if(this.props.runners !== undefined) {
			let runners = this.props.runners;
			runners.sort(function(a, b) {
				return b.timelog.length - a.timelog.length;
			});
			runners.forEach(runner => {
				let color = runner.timelog.length === 9 ? 'black' : COLORS[idx % COLORS.length];
				runnerStatuses.push(
					<RunnerRow runner={runner}
							   color={color} />
				);
				idx = idx + 1;
				if(runner.timelog.length > 0) {
					firstCheckin = new Date(runner.timelog[0].timestamp);
				}
			});
		}
			
		return (
			<Segment>
				<Grid columns={2} padded verticalAlign="top">
					<ElapsedTime firstCheckin={firstCheckin} />
					{runnerStatuses}
				</Grid>
			</Segment>
		);
	}
}
