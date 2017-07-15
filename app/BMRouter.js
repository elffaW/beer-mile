import path from 'path';
import falcor from 'falcor';
import FalcorRouter from 'falcor-router';
import * as db from './db/crud.js';

let $ref = falcor.Model.ref;
let $atom = falcor.Model.atom;

let routes = [
	{
		// model.get(['runnersList','length']).then( length => { 
		route: 'runnersList.length',
		get() {
			console.log('hit runners length route');
			return new Promise(function(resolve, reject) {
				db.getRunnerCount().
					then(function(res) {
						let retVal = [];
						retVal.push( { path: [ 'runnersList', 'length' ], value: res });
						resolve(retVal);
					}).
					catch(function(err) {
						reject(err);
					});
			});
		}
	},
	{
		// model.get(['runnersList', {from:0,to:length-1}, ['id','name', 'button', 'timelogs'], ['id','name', 'timestamp']])}).
		route: 'runnersList[{integers:indices}]["id","name","button","timelog"]["id","name","timestamp"]',
		get(pathSet) {
			/* pathSet:
			[
			  "runnersList",
			  [0:12],
			  [ "button","id","name","timelog"],
			  [ "id","name","timestamp"]
			]
			*/
			//console.log('hit runners route');
			return new Promise(function(resolve, reject) {
				let retVal = [];

				//we're just ignoring the indices and getting them all... should be ok...
				db.getAllRunners().
					then(function(runners) {
						//console.log('retrieved runners from db: ' + JSON.stringify(runners,null,2));
						for(let r in runners) {
							let runner = runners[r];
							// retVal.push( { path: [ 'runnersList', r ], value: $ref(['runnersById', runner.id]) });
							retVal.push( { path: [ 'runnersList', r, 'id' ] , value: runner.id }); 
							retVal.push( { path: [ 'runnersList', r, 'name' ] , value: runner.name }); 
							// retVal.push( { path: [ 'runnersList', r, 'button' ], value: $ref(['buttonsById', runner.button.id]) });
							// retVal.push( { path: [ 'runnersList', r, 'timelog' ], value: $atom(runner.timelogs) });
							retVal.push( { path: [ 'runnersList', r, 'button', 'id' ], value: runner.button.id });
							retVal.push( { path: [ 'runnersList', r, 'button', 'name' ], value: runner.button.name });
							let timelogs = [];
							for(let t in runner.button.timelogs) {
								let time = runner.button.timelogs[t];
								timelogs.push(time);
								console.log('found a timelog: ' + JSON.stringify(time,null,2));
							}
							console.log('found ' + timelogs.length + ' timestamps for ' + runner.name);
							retVal.push( { path: [ 'runnersList', r, 'timelog' ], value: $atom(timelogs) });
						}
						//console.log('runnersList retVal: ' + JSON.stringify(retVal,null,2));
						resolve(retVal);
					}).
					catch(function(err) {
						console.log('error retrieving runner from db: ' + JSON.stringify(err,null,2));
						reject(err);
					});
			
				
			});
		}
	},
	{
		route: 'runnersById[{integers:ids}]["id","name"]',
		get(pathSet) {
			console.log('runnersById route');
			return new Promise(function(resolve, reject) {
				let retVal = [];

				for(let i in pathSet.ids) {
					let id = pathSet.ids[i];

					db.getRunnerById(id).
						then(function(runner) {
							console.log('retrieved runner from db: ' + JSON.stringify(runner,null,2));

							retVal.push( { path: [ 'runnersById', id, 'id' ], value: runner.id });
							retVal.push( { path: [ 'runnersById', id, 'name' ], value: runner.name });
						}).
						catch(function(err) {
							console.log('error retrieving runner from db: ' + JSON.stringify(err,null,2));
							reject(err);
						});
				}
				console.log('runnersById retVal: ' + JSON.stringify(retVal, null,2));
				resolve(retVal);
			});
		}
	},
	{
		route: 'buttonsById[{integers:ids}]["id","name"]',
		get(pathSet) {
			console.log('buttonsById route');
			return new Promise(function(resolve, reject) {
				let retVal = [];

				for(let i in pathSet.ids) {
					let id = pathSet.ids[i];

					db.getButtonById(id).
						then(function(button) {
							console.log('retrieved button from db: ' + JSON.stringify(button,null,2));

							retVal.push( { path: [ 'buttonsById', id, 'id' ], value: button.id });
							retVal.push( { path: [ 'buttonsById', id, 'name' ], value: button.name });
						}).
						catch(function(err) {
							console.log('error retrieving button from db: ' + JSON.stringify(err,null,2));
							reject(err);
						});
				}
				console.log('buttonsById retVal: ' + JSON.stringify(retVal, null,2));
				resolve(retVal);
			});
		}
	},
	{
		route: 'timelogsById[{integers:ids}]["id","timestamp"]',
		get(pathSet) {
			console.log('timelogsById route');
			return new Promise(function(resolve, reject) {
				let retVal = [];

				for(let i in pathSet.ids) {
					let id = pathSet.ids[i];

					db.getTimelogById(id).
						then(function(timelog) {
							console.log('retrieved timelog from db: ' + JSON.stringify(timelog,null,2));

							retVal.push( { path: [ 'timelogsById', id, 'id' ], value: timelog.id });
							retVal.push( { path: [ 'timelogsById', id, 'timestamp' ], value: timelog.timestamp });
						}).
						catch(function(err) {
							console.log('error retrieving timelog from db: ' + JSON.stringify(err,null,2));
							reject(err);
						});
				}
				console.log('timelogsById retVal: ' + JSON.stringify(retVal, null,2));
				resolve(retVal);
			});
		}
	}
];

//pre-ES2015 way
/*
let BaseRouter = FalcorRouter.createClass(routes);
let BMRouter = function() {
	BaseRouter.call(this);
};

BMRouter.prototype = Object.create(BaseRouter.prototype);
*/

//ES2015 way
class BMRouter extends FalcorRouter.createClass(routes) {
	constructor() {
		super();

		//this.initStuff = function(params...) {
			//return new Promise ....
		//}
	}
}

export { BMRouter };
