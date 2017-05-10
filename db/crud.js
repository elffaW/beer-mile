var Runner = require('./model/runner.js');
var Timelog = require('./model/timelog.js');
var Button = require('./model/button.js');

//returns array of all button MAC addresses, or sends rejection on error or if there are no buttons in the DB 
module.exports = {
	getAllButtonMACs: function() {
		Button.findAll().	//get all the buttons
			then(function(buttons) {
				var macs = [];
				buttons.forEach(function(b) {	//put all the MACs into an array
					macs.push(b.mac);
				});

				if(macs.length > 1) {
					resolve(macs);	//return the array
				} else {
					reject("No buttons found!");	//no buttons!
				}
			}).catch(function(err) {
				reject(err);	//return the error
			});
	},


//takes a button MAC address, and inserts a new timestamp for that button
	insertTimestamp: function(mac) {
		Button.findOne({	//find the button that was pressed
			where: { mac: mac }
		}).
		then(function(button) {
			Timelog.create().	//create a new button, and...
			then(function(timelog) {
				timelog.setButton(button);	//link it to the button
			}).catch(function(err) {
				reject(err);
			});
		}).catch(function(err) {
			reject(err);
		});
	}
};