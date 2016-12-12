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
    
    g.generatePerson(function(err, person) {
        if (err) {
            res.json(err);
        } else {
            db.collection('people').insert(person);
            res.json('Person Inserted!');
        }
    });
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
