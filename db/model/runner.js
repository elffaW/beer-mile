var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var Runner = sequelize.define('runner', {
		name: {
			type: Sequelize.STRING
		}
	});

	return Runner;
};