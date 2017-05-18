var Sequelize = require('sequelize');
var btnAddyModule = require('./btnAddys.js');

var buttonMACarray = btnAddyModule.buttonMACarray;
var runnerArray = btnAddyModule.runnerArray;


const connection = new Sequelize('myDatabase', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: 'bMile.sqlite'
});


// set up model for table name and headers
var Buttons = connection.define('button', {
  buttonName:{type: Sequelize.STRING},
  buttonMAC:{type: Sequelize.STRING}
});

var Runners = connection.define('runner',{
  runnerName:{type: Sequelize.STRING},
  runnerButton:{type: Sequelize.STRING}
});

var Times = connection.define('time',{
  button: {type: Sequelize.STRING},
  time: {type: Sequelize.DATE(6)}
});

//add items to table
connection.sync({force:true}).then(function () {
  for (var i in buttonMACarray){
    Buttons.create({
      buttonName: i,
      buttonMAC: buttonMACarray[i]
    })
  }
});

connection.sync({force:true}).then(function () {
  for (var i in runnerArray){
    Runners.create({
      runnerName: i,
      runnerButton: runnerArray[i]
    })
  }
});
