import React from 'react';
import ReactDOM from 'react-dom';

// import UI elements
import { Button, Progress, Grid, Segment, Header, Icon } from 'semantic-ui-react';

const io = require('socket.io-client');
const socket = io();

import 'semantic-ui-css/semantic.min.css';
import './styles/style.css';

const COLORS = [ 'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black' ];

export class BeerMile extends React.Component {
	constructor() {
		super();
		this.state = { socketMessage:'init' };
		socket.on('test', (msg) => this.setState({socketMessage:msg}));
	}

	componentWillMount() {
		socket.emit('update', 'test');
	}

	render() {
		console.log(this.state.socketMessage);
		return (
			<div>
				<Header inverted textAlign="center" as='h2' icon>
					<Icon name='beer' />
					BEER MILE 2017
					<Header.Subheader>
						Free t-shirts provided by TC. Who LOSES.
					</Header.Subheader>
				</Header>
				<Segment>
					<Grid columns={2} >
						<Grid.Row>
							<Grid.Column>
								<Progress percent={20} active progress inverted color='red'>
									TC LOSES
								</Progress>
							</Grid.Column>
							<Grid.Column>
								<Progress percent={45} active progress inverted color='orange'>
									TC LOSES
								</Progress>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Progress percent={60} active progress inverted color='yellow'>
									TC LOSES
								</Progress>
							</Grid.Column>
							<Grid.Column>
								<Progress percent={35} active progress inverted color='green'>
									TC LOSES
								</Progress>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Progress percent={10} active progress inverted color='teal'>
									TC LOSES
								</Progress>
							</Grid.Column>
							<Grid.Column>
								<Progress percent={95} active progress inverted color='blue'>
									TC LOSES
								</Progress>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Progress percent={61} active progress inverted color='purple'>
									TC LOSES
								</Progress>
							</Grid.Column>
							<Grid.Column>
								<Progress percent={31} active progress inverted color='pink'>
									TC LOSES
								</Progress>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Progress percent={28} active progress inverted color='brown'>
									TC LOSES
								</Progress>
							</Grid.Column>
							<Grid.Column>
								<Progress percent={19} active progress inverted color='black'>
									TC LOSES
								</Progress>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</div>
		);
	}
}

ReactDOM.render(<BeerMile />, document.getElementById('beermile'));
