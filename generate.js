var _ = require('underscore');
//CSV to JSON
var Converter = require("csvtojson").Converter;
var converter = new Converter({
    noheader: true,
    eol: '\n'
});

var _fakeFirstName = function(gender, callback) {
    var names, filename;
    if (gender == 'male') {
        // http://names.mongabay.com/male_names.htm
        filename = "./data/male_first_names.csv";
    } else if (gender == 'female') {
        // http://names.mongabay.com/female_names.htm
        filename = "./data/female_first_names.csv";
    }
    converter.fromFile(filename, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            names = result;
            var name = _.sample(names, 1)[0];
            callback(name.field1);
        }
    });
};


var _fakeLastName = function() {
    var names, filename;
    filename = "./data/last_names.csv";
    converter.fromFile(filename, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            names = result;
            var name = _.sample(names, 1)[0];
            callback(name.field1);
        }
    });
};

var _fakeGender = function(callback) {
    var genders = ['male', 'female'];
    var gender = _.sample(genders, 1)[0];

    callback(gender);
};

var _fakeBirthdate = function() {

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

module.exports = {

    generatePerson: function(callback) {
        _fakeGender(function(gender) {
            _fakeFirstName(gender, function (fName) {

                var person = {
                    'fName': fName,
                    'gender': gender
                }

                callback(person);
            });
        });
    }
};