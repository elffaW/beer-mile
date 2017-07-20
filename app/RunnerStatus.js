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
	1: { percent:0, message: "Lap 1!" },	//start
	2: { percent:25, message: "Lap 2!" },	//finish lap 1
	3: { percent:50, message: "Lap 3!" },	//finish lap 2
	4: { percent:75, message: "Lap 4!" },	//finish lap 3
	5: { percent:100, message: "Finished!" },	//finish lap 4 (done)
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

		this.handleClick = this.handleClick.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		return (this.props.runner !== nextProps.runner);
	}

	handleClick() {
		
		this.props.updateRunner(this.props.runner.name);
	}

	render() {
		
		let numCheckpoints = this.props.runner.timelog.length;
		// console.log('numCheckpoints: ' + numCheckpoints);
		let progressMsg = '';
		let percent = 0;
		//assumption that timelogs are in order is probably false... should sort first
		if(numCheckpoints > 0 && numCheckpoints <= 5) {
			let elapsedTime = Math.abs(new Date(this.props.runner.timelog[numCheckpoints-1].timestamp).getTime() - new Date(this.props.runner.timelog[0].timestamp).getTime());
			let progress = PERCENT_COMPLETE[numCheckpoints];
			progressMsg = progress.message + ' (last checkpoint at ' + msToTime(elapsedTime) + ')';	
			percent = progress.percent;
		} 
		if(numCheckpoints >= 5) {
			let elapsedTime = Math.abs(new Date(this.props.runner.timelog[4].timestamp).getTime() - new Date(this.props.runner.timelog[0].timestamp).getTime());
			progressMsg = 'Finished! (FINAL TIME: ' + msToTime(elapsedTime) + ')';
			percent = 100;
		} 
		return (
			<Grid.Row onClick={this.handleClick}>
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

	render() {
		let firstCheckin = new Date();	//default in case there are no runners
		let runnerStatuses = [];
		let idx = 0;
		if(this.props.runners !== undefined) {
			let runners = this.props.runners;
			runners.sort(function(a, b) {
				if(b.timelog.length === a.timelog.length) {
					return b.timelog[b.timelog.length-1] - a.timelog[a.timelog.length-1];
				}
				return b.timelog.length - a.timelog.length;
			});
			runners.forEach(runner => {
				let color = runner.timelog.length >= 5 ? 'black' : COLORS[idx % COLORS.length];
				runnerStatuses.push(
					<RunnerRow runner={runner}
							   color={color}
							   updateRunner={this.props.changeRunner} />
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
