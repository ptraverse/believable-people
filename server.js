var express = require('express');
var http = require('http');
var path = require('path');
var router = express();
var server = http.createServer(router);
var _ = require('underscore');
var g = require('./generate.js');
var db = require('mongoskin').db('mongodb://localhost:27017/bp');

router.use(express.static(path.resolve(__dirname, './public')));

/** Param Binding - so we can have clean routes instead of using ?qStr **/
router.param('num', function(req, res, next, num) {
    req.num = num;
    next();
});
router.get('/generate/:num', function(req, res){

    /**
     * g.generatePeople is not working properly yet
     */
    // g.generatePeople(req.num, function(err, people) {
    //     if (err) {
    //         res.json(err);
    //     } else {
    //         _.each(people, function(person) {
    //             db.collection('people').insert(person);
    //         });
    //         res.json(people.length + ' people inserted!');
    //     }
    // });

    numToInsert = req.num;
    for (var i = 0; i < numToInsert; i++) {
        g.generatePerson(numToInsert, function(err, person) {
            db.collection('people').insert(person);
        });
    }
    res.json(i + ' people inserted!');

});

router.get('/people', function(req, res){
    db.collection('people').find().toArray(function(err, result) {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    });
});

server.listen(80, "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
