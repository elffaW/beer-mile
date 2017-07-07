import React from 'react';
import ReactDom from 'react-dom';

export class BeerMile extends React.Component {

	render() {
		console.log('Hello');
		return (
			<div>
				<p>HERROOO World</p>
			</div>
		);
	}
}

ReactDom.render(<BeerMile />, document.getElementById('beermile'));