import React from 'react';
import ReactDOM from 'react-dom';

const io = require('socket.io-client');
const socket = io();

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
				<h2>Hello World</h2>
			</div>
		);
	}
}

ReactDOM.render(<BeerMile />, document.getElementById('beermile'));