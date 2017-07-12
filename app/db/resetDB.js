var crud = require('./crud.js');
var db = require('./db.js');

db.dbConnection.sync({force:true}).
	then(function() {
		console.log('Database created');
	
		crud.loadData().
			then(function(done) {
				console.log('Data loaded');

			}).
			catch(function(err) {
				console.error(`Data load error: ${err}`);
			});
	}).
	catch(function(err) {
		console.error(`Error creating Database: ${err}`);
	});

