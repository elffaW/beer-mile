//includes / requires
var dash_button = require('node-dash-button');

// import * as crud from 'db/crud.js';
var crud = require('./db/crud.js');
var db = require('./db/db.js');

db.dbConnection.sync({force:false}).
	then(function() {
		console.log('Database created');
	
		crud.loadData().
			then(function(done) {
				console.log('Data loaded');
			}).
			catch(function(err) {
				console.errog(`Data load error: ${err}`);
			});
	});

var DASH_MAC_ADDRESSES = [];	//get list of button MACs from database (pre-populated)

//REMOVE FOLLOWING LINE AFTER TESTING
DASH_MAC_ADDRESSES.push("68:54:fd:27:a0:ba"); //temp (MAC of poof button)

//get all the button MAC addresses
crud.getAllButtonMACs().
	then(function(allMACs) {
		console.log(`Got button list from DB [${allMACs}]`);
		DASH_MAC_ADDRESSES = allMACs;
	}).catch(function(err) {
		console.error(err);
	});

var dash = dash_button(DASH_MAC_ADDRESSES);

console.log(`Listening for presses from these MACs: [${DASH_MAC_ADDRESSES}]`);
//listen for button presses from any of the MACs in the DB
dash.on("detected", function (dash_mac){
    //insert a new timestamp into the DB
    console.log(`Detected button with MAC [${dash_mac}]`);
    console.log(`Inserting timestamp into DB [${new Date()}]`);
    crud.insertTimestamp(dash_mac, new Date());
});
