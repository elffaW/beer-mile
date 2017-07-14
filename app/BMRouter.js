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
		route: 'runnersList[{integers:indices}]["id","name","button","timelogs"]["id","name","timestamp"]',
		get(pathSet) {
			console.log('hit runners route');
			console.log(JSON.stringify(pathSet,null,2));
			resolve('nope');
			// return new Promise(function(resolve, reject) {
			// 	db.getRunnerCount().
			// 		then(function(res) {
			// 			let retVal = [];
			// 			retVal.push( { path: [ 'runnersList', 'length' ], value: res });
			// 			resolve(retVal);
			// 		}).
			// 		catch(function(err) {
			// 			reject(err);
			// 		});
			// });
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