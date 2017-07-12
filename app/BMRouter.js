import path from 'path';
import falcor from 'falcor';
import FalcorRouter from 'falcor-router';
import * as db from './db/crud.js';

let $ref = falcor.Model.ref;
let $atom = falcor.Model.atom;

let routes = [
	{
		/* route example
		route: 'thing.length',
		get(pathSet) {
			return new Promise(function(resolve,reject) {
				db.getThingCount().
					then(function(res) {
						let retVal = [];
						retVal.push( { path : [ 'thing', 'length' ], value: res } );
						resolve(retVal);
					}).
					catch(function(err) {
						reject(err);
					});
			});
		}
		end route example */
		//test route
		route: "test",
		get(pathSet) {
			console.log('Hit "test" route, with pathSet: ' + JSON.stringify(pathSet));
			return { path: ["test"], value: "Falcor works!" };
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