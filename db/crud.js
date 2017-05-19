var db = require('./db');
var fs = require('fs');

/* load a JSON file like so
 *	var theFile = './db/data/file.json';
 *	var theObj = JSON.parse(fs.readFileSync(theFile, 'utf8'));
 *	db.theObjType.bulkCreate( theObj ).then(...).catch(...);
 */

//returns array of all button MAC addresses, or sends rejection on error or if there are no buttons in the DB 
module.exports = {
	getAllButtonMACs: () => {
		return new Promise(function(resolve, reject) {
			db.button.findAll().	//get all the buttons
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
		});
	},


//takes a button MAC address, and inserts a new timestamp for that button
	insertTimestamp: (mac, timestamp) => {
		return new Promise(function(resolve, reject) {
			db.button.findOne({	//find the button that was pressed
				where: { mac: mac }
			}).
			then(function(button) {
				console.log(`Got the button... ${JSON.stringify(button,null,4)}`);
				var newTime = {};
				newTime.timestamp = timestamp;
				db.timelog.create(newTime).	//create a new button, and...
				then(function(timelog) {
					timelog.setButton(button).	//link it to the button
						then(function(done) {
							console.log('related button to timelog');
							resolve(done);
						}).
						catch(function(err) {
							reject(err);
						});
				}).catch(function(err) {
					reject(err);
				});
			}).catch(function(err) {
				reject(err);
			});
		});
	},

//loads the initial button data
	loadData: () => {
		console.log('loading data');
		return new Promise(function(resolve, reject) {
			var buttonFile = './db/data/button.json';
			var buttonObj = JSON.parse(fs.readFileSync(buttonFile, 'utf8'));
			db.button.bulkCreate( buttonObj ).
				then(function(buttonsDone) {
					console.log(`Buttons loaded: ${JSON.stringify(buttonsDone,null,2)}`);
					var runnerFile = './db/data/runner.json';
					var runnerObj = JSON.parse(fs.readFileSync(runnerFile, 'utf8'));
					db.runner.bulkCreate( runnerObj ).
						then(function(runnersDone) {
							console.log(`Runners loaded: ${JSON.stringify(runnersDone,null,2)}`);
							resolve('Buttons and Runners loaded');
						}).
						catch(function(err) {
							console.error(`Error loading runners: ${err}`);
							reject(err);
						});
				}).
				catch(function(err) {
					console.error(`Error loading buttons: ${err}`);
					reject(err);
				});
		});
	}
};
