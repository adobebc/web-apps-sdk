describe('BCAPI.Models.FileSystem.File', function() {
	'use strict';
	
	var BcFile = BCAPI.Models.FileSystem.File;
	var BcFolder = BCAPI.Models.FileSystem.Folder;

	beforeEach(function() {
        BCAPI.Helper.Test.runTestServer();
    });

	it('should allow to create and then retrieve a file', function() {
		var file = genFile();
		var testStartTime = new Date();
		expect(file.get('type')).toBe('file');
		promiseScenario({
			'promise': function() {
				return file.save().then(function() { return file.fetch(); });
			},
			'complete': function() {
				expect(file.get('lastModified')).toBeDefined();
				expect(file.get('size')).toBeDefined();
				expect(file.get('lastModified')).toBeGreaterThan(testStartTime);
			}
		});
	});

	xit('should retrieve file data correctly', function() {
		var file = genFile();

		promiseScenario({
			'promise': function() {
				var fileUploaded = file.save();
				var dataRetrieved = fileUploaded.then(function() {
					var newFile = new BcFile(file.folder(), file.get('name'));
					return newFile.fetchData().then(function() {
						return newFile;
					});
				});
			},
			'complete': function(newFile) {
				expect(newFile.get('data').toBe(fileContent));
			}
		});
	});

	xit('should delete files', function() {
		var file = genFile();
		promiseScenario({
			'promise': function() {
				var destroyed = file.destroy();
				var newFile = new BcFile(file.folder(), file.get('name'));
				var retrievedStatus = newFile.fetch().then(
					function() { return true; },
					function() { return false; });
				return retrievedStatus;
			},
			'complete': function(wasRetrieved) {
				expect(wasRetrieved).toBe(false);
			}
		});
	});

	xit('should update files', function() {
		var file = genFile();
		var newData = randomString(32);
		promiseScenario({
			'promise': function() {
				var creationTime;
				var created = file.save();
				created.then(function() {
					var newFile = new BcFile(file.folder(), file.get('name'));
					timestamp1 = file.get('lastModified');
					file.set('data', newData);
					var updated = file.save();
					var retrieved = updated.then(function() {
						return newFile.fetch();
					});
					return retrieved.then(function() {
						return {
							'updatedFile': newFile,
							'creationTime': creationTime
						};
					});
				});
				file.save();
			},
			'complete': function(result) {
				var file = result.file;
				var creationTime = result.creationTime;
				expect(file.get('data')).toBe(newData);
				expect(file.get('lastModified')).toBeGreaterThan(creationTime);
			}
		});
	});

	// Utility functions
	
	function randChar() {
		var possibleChars = 'abcdefghijklmnopqrstuvwxyz';
		var index = Math.floor(Math.random() * possibleChars.length);
		return possibleChars[index];
	}

	function randomString(size) {
		return _.times(size, randChar).join('');
	}

	function genFileName() {
		return 'generated_' + randomString(12);
	}

	function promiseScenario(scenario) {
		var promiseFun = scenario.promise,
			promiseCompletion = scenario.complete,
			message = scenario.message || 'Promise in testing scenario',
			finished = false,
			success,
			result;
		runs(function() {
			var p = promiseFun();
			p.done(function(x) {
				console.log('PROMISE WAS CALLED');
				result = x;
				finished = true;
				success = true;
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log('Promise failed. Error status was: ' + textStatus + '. Error thrown was: ' + errorThrown);
				finished = true;
				success = false;
				console.log('Call has failed');
			});
		});
		waitsFor(function() { return finished; }, message, 2000);
		runs(function() {
			expect(success).toBeTruthy('Promise completion should be successful');
			if (success) {
				promiseCompletion(result);	
			}
		});
	}

	function genFile(directory) {
		directory = directory || BcFolder.Root;
		var fileName = genFileName();
		var content = randomString(20);
		return directory.file({
			'name': fileName,
			'data': content
		});
	}

});