var express = require('express');
var http = require('http');
var path = require('path');
var router = express();
var server = http.createServer(router);
var _ = require('underscore');
var g = require('./generate.js');

router.use(express.static(path.resolve(__dirname, './public')));

/** Param Binding **/
router.param('num', function(req, res, next, num) {
    req.num = num;
    next();
});
router.get('/generate/:num', function(req, res){
    var people = g.generatePeople(req.num);
    res.json(people);
});

server.listen(80, "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
