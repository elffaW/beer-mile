// var Runner = require('./model/runner.js');
// var Timelog = require('./model/timelog.js');
// var Button = require('./model/button.js');

var db = require('./db');

var THE_BUTTONS = [
	{
		name: 'MILKBONE',
		mac: '40:b4:cd:bc:63:ca'
	}, {
		name: 'VITAMIN WATER',
		mac: '68:37:e9:b7:ed:ef'
	}, {
		name: 'BANANA',
		mac: '44:65:0d:25:bc:e3'
	}, {
		name: 'AMAZON BASICS',
		mac: '68:37:e9:ea:da:f8'
	}, {
		name: 'PERKY JERKY',
		mac: '34:d2:70:c5:3a:bf'
	}, {
		name: 'BURTS BEES',
		mac: '40:b4:cd:72:c9:1a'
	}, {
		name: 'ANGEL SOFT',
		mac: '68:54:fd:38:e2:c2'
	}, {
		name: 'QUILTED NORTHERN',
		mac: '40:b4:cd:1c:47:1e'
	}, {
		name: 'CHARMIN',
		mac: '88:71:e5:f6:13:79'
	}, {
		name: 'PLAYTEX',
		mac: '68:37:e9:51:0f:8f'
	}, {
		name: 'PASSION',
		mac: '68:54:fd:54:4a:6c'
	}, {
		name: 'SKYN',
		mac: '68:54:fd:51:f5:31'
	}, {
		name: 'POOF',
		mac: '68:54:fd:27:a0:ba'
	}
];

var THE_RUNNERS = [
	{ name: 'MATT' },
	{ name: 'MIKE' },
	{ name: 'TC' },
	{ name: 'KIM' },
	{ name: 'ANDY' },
	{ name: 'MEGHAN' },
	{ name: 'LIZ' },
	{ name: 'PETER' },
	{ name: 'JR' },
	{ name: 'SHANLEY' },
	{ name: 'JAY' },
	{ name: 'NORA' },
];

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
		return new Promise(function(resolve, reject) {
			var buttonPromises = [];
			for(var b in THE_BUTTONS) {
				buttonPromises.push(createButton(THE_BUTTONS[b]));
			}
			Promise.all(buttonPromises).
				then(function(buttonsDone) {
					console.log(`Buttons loaded: ${buttonsDone}`);
					var runnerPromises = [];
					for(var r in THE_RUNNERS) {
						runnerPromises.push(createRunner(THE_RUNNERS[r]));
					}
					Promise.all(runnerPromises).
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
	},

	createButton: (button) => {
		return new Promise(function(resolve,reject) {
			db.button.create(button).
				then(function(created) {
					console.log(`Button added: [${button.name}]`);
					resolve(created);
				}).
				catch(function(err) {
					console.error(err);
					reject(err);
				});
		});
	},

	createRunner: (runner) => {
		return new Promise(function(resolve,reject) {
			db.runner.create(runner).
				then(function(created) {
					console.log(`Button added: [${runner.name}]`);
					resolve(created);
				}).
				catch(function(err) {
					console.error(err);
					reject(err);
				});
		});
	}
};
