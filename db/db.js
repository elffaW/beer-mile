var Sequelize = require('sequelize');

var Runner = require('./model/runner.js');
var Timelog = require('./model/timelog.js');
var Button = require('./model/button.js');

var sequelize = new Sequelize('racetimes', null, null, {
  dialect: 'sqlite',
  storage: 'db/racetimes.sqlite'
});


// setup relationships (probably should happen elsewhere)
Runner.belongsTo(Button, { foreignKey: 'button_id' });
Button.hasOne(Runner, { foreignKey: 'button_id' });

Timelog.belongsTo(Button, { foreignKey: 'button_id' });
Button.hasMany(Timelog, { foreignKey: 'button_id' });


//initialize Database (probably should do elsewhere)
// force: true will drop the table if it already exists
Button.sync({force: true}).then(function () {
  // Table created
  Runner.sync({force: true}).then(function () {
  // Table created
	  Button.create({
		name: '68:54:fd:27:a0:ba'
	  }).then(function(button) {
		Runner.create({
		  name: 'mike'
		}).then(function(runner) {
			runner.setButton(button);
		});
		  
	  });
  });

  Timelog.sync({force: true});

});






