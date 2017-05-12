var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Button = sequelize.define('button', {
		mac: {
			type: DataTypes.STRING
		}
	});

	return Button;
};
