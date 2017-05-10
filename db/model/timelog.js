var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var Timelog = sequelize.define('timelog', {
		timestamp: {
			type: Sequelize.DATETIME
		}
	});

	return Timelog;
};