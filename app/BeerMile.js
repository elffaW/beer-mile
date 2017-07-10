import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';

// import UI elements
import Button from 'material-ui/Button';

const io = require('socket.io-client');
const socket = io();

// import style from './styles/style.css';
import './styles/style.css';
// import './styles/fonts';
// import 'grommet/scss/vanilla/index';

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
			<MuiThemeProvider>
				<Button>
					<i class="material-icons">&#xE87C;</i>TC LOSES
				</Button>
			</MuiThemeProvider>
		);
	}
}

ReactDOM.render(<BeerMile />, document.getElementById('beermile'));
