//includes / requires
var dash_button = require('node-dash-button');

// import * as db from 'db/crud.js';
var db = require('./db/crud.js');

var DASH_MAC_ADDRESSES = [];	//get list of button MACs from database (pre-populated)

//REMOVE FOLLOWING LINE AFTER TESTING
DASH_MAC_ADDRESSES.push("68:54:fd:27:a0:ba"); //temp (MAC of poof button)

//get all the button MAC addresses
db.getAllButtonMACs().
	then(function(allMACs) {
		DASH_MAC_ADDRESSES = allMACs;
	}).catch(function(err) {
		console.error(err);
	});

var dash = dash_button(DASH_MAC_ADDRESSES);

//listen for button presses from any of the MACs in the DB
dash.on("detected", function (dash_mac){
    //insert a new timestamp into the DB
    db.insertTimestamp(dash_mac);
});
