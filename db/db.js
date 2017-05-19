var Sequelize = require('sequelize');

// var Runner = require('./model/runner.js');
// var Timelog = require('./model/timelog.js');
// var Button = require('./model/button.js');



var dbConnection = new Sequelize('racetimes', null, null, {
  dialect: 'sqlite',
  storage: 'db/racetimes.sqlite',
  logging: false	//false to turn off SQL logging (default true)
});

var db = {};

db.runner = dbConnection.import('./model/runner.js');
db.timelog = dbConnection.import('./model/timelog.js');
db.button = dbConnection.import('./model/button.js');

// setup relationships (probably should happen elsewhere)
db.runner.belongsTo(db.button, { foreignKey: 'button_id' });
db.button.hasOne(db.runner, { foreignKey: 'button_id' });

db.timelog.belongsTo(db.button, { foreignKey: 'button_id' });
db.button.hasMany(db.timelog, { foreignKey: 'button_id' });


//initialize Database (probably should do elsewhere)
// force: true will drop the table if it already exists
// Button.sync({force: true}).then(function () {
//   // Table created
//   Runner.sync({force: true}).then(function () {
//   // Table created
// 	  Button.create({
// 		name: '68:54:fd:27:a0:ba'
// 	  }).then(function(button) {
// 		Runner.create({
// 		  name: 'mike'
// 		}).then(function(runner) {
// 			runner.setButton(button);
// 		});
		  
// 	  });
//   });

//   Timelog.sync({force: true});

// });

db.dbConnection = dbConnection;
db.Sequelize = Sequelize;

module.exports = db;


