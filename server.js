var express = require('express');
var http = require('http');
var path = require('path');
var router = express();
var server = http.createServer(router);
var _ = require('underscore');
var faker = require('./faker.js');
var db = require('mongoskin').db('mongodb://localhost:27017/bp');

router.use(express.static(path.resolve(__dirname, './public')));

/** Param Binding - so we can have clean routes instead of using ?qStr **/
router.param('num', function(req, res, next, num) {
    req.num = num;
    next();
});
router.get('/generate/:num', function(req, res){
    var people = faker.generatePeople(req.num);
    var i = 0;
    _.each(people, function(person) {
        db.collection('people').insert(person);
        i++;
    });
    res.json(i + ' people inserted!');
});

router.get('/people', function(req, res){
    db.collection('people').find().toArray(function(err, result) {
        if (err) {
            throw err;
        } else {
            /**
             * Add SIN numbers
             * http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
             * These won't be perfectly unique but as long as we have fewer than 2^31 items we should be OK
             */
            var peopleWithSin = [];
            _.each(result, function(person) {
                var key = person.gender + person.fName + person.lName + person.birthDay;
                var hash = 0, i, chr, len;
                for (i = 0, len = key.length; i < len; i++) {
                    chr   = key.charCodeAt(i);
                    hash  = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }
                hash = Math.abs(hash); //no negative values
                person.sin = hash + ''; //cast to String
                peopleWithSin.push(person);
            });
            res.json(peopleWithSin);
        }
    });
});

router.get('/empty', function(req, res) {
    db.collection('people').remove({});
    res.json('removed!');
});

server.listen(80, "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
