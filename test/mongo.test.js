var assert = require('assert');

/**
 * need to have mongodb server running
 **/
it('should have a mongodb on localhost with bp collection', function(done) {
    var db = require('mongoskin').db('mongodb://localhost:27017/bp');
    db.collection('people').find().toArray(function(err, result) {
        if (err) {
            throw err;
        }
        assert(result.length > 0);
        done();
    });
});
