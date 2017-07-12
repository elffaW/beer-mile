var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Runner = sequelize.define('runner', {
		name: {
			type: DataTypes.STRING
		}
	});

	return Runner;
};
