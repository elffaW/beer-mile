//includes / requires
var dash_button = require('node-dash-button');

// import * as crud from 'db/crud.js';
var crud = require('./db/crud.js');
var db = require('./db/db.js');

db.dbConnection.sync({force:false}).
	then(function() {
		console.log('Database created');
	
		var DASH_MAC_ADDRESSES = [];	//get list of button MACs from database (pre-populated)

		//get all the button MAC addresses
		crud.getAllButtonMACs().
			then(function(allMACs) {
				console.log(`Got button list from DB [${allMACs}]`);
				DASH_MAC_ADDRESSES = allMACs;

				//below included for testing purposes
				if(DASH_MAC_ADDRESSES.length < 1) {
					DASH_MAC_ADDRESSES.push("68:54:fd:27:a0:ba"); //temp (MAC of poof button)
				}

				var dash = dash_button(DASH_MAC_ADDRESSES, null, null, 'all');

				console.log(`Listening for presses from these MACs: [${DASH_MAC_ADDRESSES}]`);
				//listen for button presses from any of the MACs in the DB
				dash.on("detected", function (dash_mac){
				    //insert a new timestamp into the DB
				    console.log(`Detected button with MAC [${dash_mac}]`);
				    console.log(`Inserting timestamp into DB [${new Date()}]`);
				    crud.insertTimestamp(dash_mac, new Date());
				});

			}).catch(function(err) {
				console.error(err);
			});

				
	});

