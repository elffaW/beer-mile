//includes / requires
import express from 'express';
import bodyParser from 'body-parser';

let dash_button = require('node-dash-button');
const socketio = require('socket.io');

import * as crud from 'db/crud.js';
// let crud = require('./db/crud.js');
import db from './db/db.js';

let http = require('http'),
    app = express();

const server = http.Server(app);

app.use(express.static('./build/client'));
app.use(bodyParser.urlencoded({extended: false}));

server.listen(80);
/* to switch UID in case of root/sudo requirement for port 80 (inside of server.listen callback)
server.listen(80, err => {
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
				if(DASH_MAC_ADDRESSES.length < 1) {
					DASH_MAC_ADDRESSES.push("68:54:fd:27:a0:ba"); // (MAC of poof button)
				}

				var dash = dash_button(DASH_MAC_ADDRESSES, null, null, 'all');

				console.log(`Listening for presses from these MACs: [${DASH_MAC_ADDRESSES}]`);
				console.log();
				//listen for button presses from any of the MACs in the DB
				dash.on("detected", function (dash_mac){
				    //insert a new timestamp into the DB
				    console.log(`Detected button with MAC [${dash_mac}], inserting timestamp into DB [${new Date()}]`);
				    crud.insertTimestamp(dash_mac, new Date());
				});

			}).catch(function(err) {
				console.error(err);
			});

				
	});

