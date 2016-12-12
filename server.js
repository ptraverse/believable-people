var express = require('express');
var http = require('http');
var path = require('path');
var router = express();
var server = http.createServer(router);
var _ = require('underscore');

router.use(express.static(path.resolve(__dirname, './public')));

server.listen(80, "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
