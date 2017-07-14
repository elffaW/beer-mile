var crud = require('./crud.js');
var db = require('./db.js');

db.dbConnection.sync({force:true}).
	then(function() {
		console.log('Database created');
	
		crud.loadData().
			then(function(done) {
				console.log('Data loaded, testing with runner count');

				crud.getRunnerCount().
					then(function(count) {
						console.log('Number of runners in DB: ' + JSON.stringify(count,null,2));
					}).
					catch(function(err) {
						console.error('Test failed, cannot get runner count');
						console.error(err);
					});
			}).
			catch(function(err) {
				console.error(`Data load error: ${err}`);
			});

	}).
	catch(function(err) {
		console.error(`Error creating Database: ${err}`);
	});

