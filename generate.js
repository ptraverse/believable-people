var async = require('async');
var _ = require('underscore');
var moment = require('moment');
var db = require('mongoskin').db('mongodb://localhost:27017/bp');

var Converter = require("csvtojson").Converter;
var converter = new Converter({
    noheader: true,
    eol: '\n'
});

var _fakeFirstName = function(callback) {
    var fnames, ffilename;
    // Hardcode to MALE for now - will come back to this later
    var gender = 'male';
    if (gender == 'male') {
        // http://names.mongabay.com/male_names.htm
        ffilename = "./data/male_first_names.csv";
    } else if (gender == 'female') {
        // http://names.mongabay.com/female_names.htm
        ffilename = "./data/female_first_names.csv";
    }
    converter.fromFile(ffilename, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            fnames = result;
            var fname = _.sample(fnames, 1)[0];
            callback(null, fname.field1.toLowerCase());
        }
    });
};


var _fakeLastName = function(callback) {
    var lnames, lfilename;
    lfilename = "./data/last_names.csv";
    converter.fromFile(lfilename, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            lnames = result;
            var lname = _.sample(lnames, 1)[0];
            callback(null, lname.field1.toLowerCase());
        }
    });
};

var _fakeGender = function(callback) {
    var genders = ['male', 'female'];
    var gender = _.sample(genders, 1)[0];

    callback(null, gender);
};

var _fakeBirthdate = function(callback) {
    function getRandom(min, max) {
        return (Math.random() * (max - min)) + min;
    }
    var start = 29888269; // Dec 12 1970
    var end = 1481581069; // Dec 12 2016
    var birthday = moment.unix(getRandom(start, end)).format('YYYY-MM-D');
    // console.log(birthday);

    callback(null, birthday);
};

var _fakeUnitHouse = function() {

};

var _fakeStreet = function() {

};

var _fakeCity = function() {

};

var _fakeSateProvince = function() {

};

var _fakeEmail = function() {

};

var _fakePhone = function() {

};

var _fakeSin = function() {

};

var _generatePerson = function(callback) {

    async.parallel({
        fName: _fakeFirstName,
        lName: _fakeLastName,
        birthdate: _fakeBirthdate
    },

    function(err, results) {
        if (err) {
            console.log(err)
        } else {
            var person = {
                'gender': 'male',
                'fName': results.fName,
                'lName': results.lName,
                'birthdate': results.birthdate
            };
            callback(null, person);
        }
    });
};

var _getPeople = function(callback) {
    db.collection('people').find().toArray(function(err, result) {
        if (err) {
            throw err;
        } else {
            callback(result);
        }
    });
}

module.exports = {
    generatePerson: _generatePerson,
    getPeople: _getPeople
};