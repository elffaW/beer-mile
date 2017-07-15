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
				console.log(`Got the button... ${button.name}`);
				var newTime = {};
				newTime.timestamp = timestamp;
				db.timelog.create(newTime).	//create a new button, and...
				then(function(timelog) {
					timelog.setButton(button).	//link it to the button
						then(function(done) {
							resolve({'timestamp':timelog.timestamp, 'buttonId':button.id});
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
			var buttonFile = './app/db/data/button.json';
			var buttonObj = JSON.parse(fs.readFileSync(buttonFile, 'utf8'));
			db.button.bulkCreate( buttonObj ).
				then(function(buttonsDone) {
					console.log(`Buttons loaded: ${JSON.stringify(buttonsDone,null,2)}`);
					var runnerFile = './app/db/data/runner.json';
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
	},

	/* takes a runner id and button id and links them */
	setButtonForRunner(runnerId, buttonId) {
		db.runner.findOne({
			where: { id: {$eq: runnerId}}
		}).
		then(runner => {
			db.button.findOne({
				where: { id: {$eq: buttonId}}
			}).
			then(button => {
				runner.setButton(button).
					then(done => {
						resolve(`Runner ${runner.name} and Button ${button.name} now linked.`);
					}).
					catch(err => {
						reject(err);
					});
			}).
			catch(err => {
				reject(err);
			});
		}).
		catch(err => {
			reject(err);
		});
	},

	/* returns a count of runners in the database (who have buttons associated to them) */
	getRunnerCount() {
		return new Promise(function(resolve, reject) {
			db.runner.findAndCountAll({
				where: { button_id: { $ne: null } }
			}).
			then(runners => {
				resolve(runners.count);
			}).
			catch(err => {
				reject(err);
			});
		});
	},

	/* get all runners that have a button, and also get the buttons and timelogs */
	getAllRunners() {
		return new Promise(function(resolve, reject) {
			db.runner.findAll({
					where: { button_id: {$ne: null}},
					include: [{
						model: db.button,
						include: [db.timelog]
					}]
				}).
				then(runners => {
					console.log('got runners: ' + JSON.stringify(runners,null,2));
					resolve(runners);
				}).
				catch(err => {
					reject(err);
				});
		});
	},

	getRunnerById(id) {
		return new Promise(function(resolve, reject) {
			db.runner.findOne({
				where: { id: {$eq: id }}
			}).
			then(runner => {
				console.log('got runner: ' + JSON.stringify(runner,null,2));
				resolve(runner);
			}).
			catch(err => {
				reject(err);
			});
		});
	},

	getButtonById(id) {
		return new Promise(function(resolve, reject) {
			db.button.findOne({
				where: { id: {$eq: id }}
			}).
			then(button => {
				console.log('got button: ' + JSON.stringify(button,null,2));
				resolve(button);
			}).
			catch(err => {
				reject(err);
			});
		});
	},

	getTimelogById(id) {
		return new Promise(function(resolve, reject) {
			db.timelog.findOne({
				where: { id: {$eq: id }}
			}).
			then(timelog => {
				console.log('got timelog: ' + JSON.stringify(timelog,null,2));
				resolve(timelog);
			}).
			catch(err => {
				reject(err);
			});
		});
	}
};
