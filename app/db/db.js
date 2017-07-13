let Sequelize = require('sequelize');

// var Runner = require('./model/runner.js');
// var Timelog = require('./model/timelog.js');
// var Button = require('./model/button.js');
let runnerModel = require('./model/runner');
let timelogModel = require('./model/timelog');
let buttonModel = require('./model/button');


var dbConnection = new Sequelize('racetimes', null, null, {
  dialect: 'sqlite',
  storage: 'app/db/racetimes.sqlite',
  logging: false	//false to turn off SQL logging (default true)
});

var db = {};

db.runner = runnerModel(dbConnection, Sequelize.DataTypes);
db.timelog = timelogModel(dbConnection, Sequelize.DataTypes);
db.button = buttonModel(dbConnection, Sequelize.DataTypes);
// db.runner = dbConnection.import('./model/runner.js');
// db.timelog = dbConnection.import('./model/timelog.js');
// db.button = dbConnection.import('./model/button.js');

// setup relationships (probably should happen elsewhere)
db.runner.belongsTo(db.button, { foreignKey: 'button_id' });
db.button.hasOne(db.runner, { foreignKey: 'button_id' });

db.timelog.belongsTo(db.button, { foreignKey: 'button_id' });
db.button.hasMany(db.timelog, { foreignKey: 'button_id' });


db.dbConnection = dbConnection;
db.Sequelize = Sequelize;

module.exports = db;


