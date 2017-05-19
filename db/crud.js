var db = require('./db');
var fs = require('fs');

/* load a JSON file like so
 *	var theFile = './src/db/data/file.json';
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
				var newTime = {};
				newTime.timestamp = timestamp;
				Timelog.create(newTime).	//create a new button, and...
				then(function(timelog) {
					timelog.setButton(button);	//link it to the button
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
// 			var buttonPromises = [];
// 			for(var b in THE_BUTTONS) {
// 				console.log(`Found button to create: ${THE_BUTTONS[b]}`);
// 				buttonPromises.push(db.button.create(THE_BUTTONS[b]));
// 			}
// 			Promise.all(buttonPromises).
			var buttonFile = './src/db/data/button.json';
			var buttonObj = JSON.parse(fs.readFileSync(buttonFile, 'utf8'));
			db.button.bulkCreate( buttonObj ).
				then(function(buttonsDone) {
					console.log(`Buttons loaded: ${buttonsDone}`);
// 					var runnerPromises = [];
// 					for(var r in THE_RUNNERS) {
// 						console.log(`Found runner to create: ${THE_RUNNERS[r]}`);
// 						runnerPromises.push(db.runner.create(THE_RUNNERS[r]));
// 					}
// 					Promise.all(runnerPromises).
					var runnerFile = './src/db/data/runner.json';
					var runnerObj = JSON.parse(fs.readFileSync(runnerFile, 'utf8'));
					db.button.bulkCreate( buttonObj ).
						then(function(runnersDone) {
							console.log(`Runners loaded: ${runnersDone}`);
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
