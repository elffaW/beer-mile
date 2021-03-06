//includes / requires
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import falcor from 'falcor';
import falcorExpress from 'falcor-express';
import { BMRouter } from './BMRouter';

import dash_button from 'node-dash-button';
import socketio from 'socket.io';

// import * as crud from 'db/crud.js';
import crud from './db/crud.js';
import db from './db/db.js';

import http from 'http';

let app = express();

app.use(express.static('../build/client'));
app.use(bodyParser.urlencoded({extended: false}));

//setup general falcor route (intentionally creates new router for each call)
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new BMRouter();
}) );

//basic listen statement, without callback
const server = app.listen(8181, err => {
	if(err) {
		return console.error(err);
	}

	console.log('Server running: navigate to http://localhost:8181');
});

/*// listen but with code to switch UID in case of root/sudo requirement for port 80 (inside of server.listen callback)
app.listen(80, err => {
	if(err) {
		console.error(err);
		return;
	}
	
	let uid = parseInt(process.env.SUDO_UID);
	if(uid) {
		process.setuid(uid);
		console.debug('Server running as UID: ' + process.getuid());
	}
	
	console.log('Server running: navigate to http://localhost');
});
*/

let io = socketio.listen(server);

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('update', (msg) => {
		console.log('received message: ' + msg);
		io.emit('test', 'new message');
	});
});

app.use(express.static('build'));

app.get('/', function(req, res) {
	console.log('heard a thing');
	res.sendFile('index.html');
});

/************************ LISTEN FOR BUTTON PRESSES ************************/
db.dbConnection.sync({force:false}).
	then(function() {
		console.log('Database created');
	
		var DASH_MAC_ADDRESSES = [];	//get list of button MACs from database (pre-populated)

		//get all the button MAC addresses
		crud.getAllButtonMACs().
			then(function(allMACs) {
				// console.log(`Got button list from DB [${allMACs}]`);
				DASH_MAC_ADDRESSES = allMACs;

				//below included for testing purposes
//				if(DASH_MAC_ADDRESSES.length < 1) {
//					DASH_MAC_ADDRESSES.push("68:54:fd:27:a0:ba"); // (MAC of poof button)
//				}

				var dash = dash_button(DASH_MAC_ADDRESSES, null, 3000, 'udp');


				console.log(`Listening for presses from these MACs: [${DASH_MAC_ADDRESSES}]`);
				console.log();
				//listen for button presses from any of the MACs in the DB
				dash.on("detected", function (dash_mac){
				    //insert a new timestamp into the DB
				    console.log(`Detected button with MAC [${dash_mac}], inserting timestamp into DB [${new Date()}]`);
				    crud.insertTimestamp(dash_mac, new Date()).
						then(function(buttonStamp) {
							// socket emit to notify frontend to update (event "runnerCheckpoint")
							console.log('button timestamp recorded, emit over sockets');
							console.log(JSON.stringify(buttonStamp,null,2));
							io.emit('runnerCheckpoint', buttonStamp);
						});
				});

			}).catch(function(err) {
				console.error(err);
			});

				
	});

