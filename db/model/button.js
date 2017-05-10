var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var Button = sequelize.define('button', {
		name: {
			mac: Sequelize.STRING
		}
	});

	return Button;
};