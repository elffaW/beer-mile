var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Timelog = sequelize.define('timelog', {
		timestamp: {
			type: DataTypes.DATE
		}
	});

	return Timelog;
};
