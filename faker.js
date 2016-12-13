var fs = require("fs");
var _ = require('underscore');
var moment = require('moment');
var db = require('mongoskin').db('mongodb://localhost:27017/bp');

var _randomFromFile = function(file) {
    var fileContents = fs.readFileSync(file);
    var lines = fileContents.toString().split('\n');

    return _.sample(lines, 1)[0].toLowerCase();
};

var _fakeFirstName = function(gender) {
    var filename;
    if (gender == 'male') {
        filename = './data/male_first_names.csv';
    } else if (gender == 'female') {
        filename = './data/female_first_names.csv';
    } else {
        throw new Error("gender must be either male or female despite political correctness");
    }

    return _randomFromFile(filename);
};


var _fakeLastName = function() {
    var filename = './data/last_names.csv';

    return _randomFromFile(filename);
};

var _fakeGender = function() {
    var genders = ['male', 'female'];
    var gender = _.sample(genders, 1)[0];

    return gender;
};

var _fakeBirthday = function() {
    function getRandom(min, max) {
        return (Math.random() * (max - min)) + min;
    }
    var start = 29888269; // Dec 12 1970
    var end = 1481581069; // Dec 12 2016
    var birthday = moment.unix(getRandom(start, end)).format('YYYY-MM-DD');

    return birthday;
};

var _fakeHouse = function() {
    function getRandom(min, max) {
        return (Math.random() * (max - min)) + min;
    }
    var start = 1;
    var end = 9999;
    var house = getRandom(start, end);

    return house;
};

var _fakeStreet = function() {
    return _randomFromFile('./data/streets.csv');
};

var _fakeCityAndProvince = function() {
    return _randomFromFile('./data/canadian_cities.csv');
};

var _fakeEmail = function() {
    
};

var _fakePhone = function() {

};

var _fakeSin = function() {

};

var _generatePerson = function() {
    var gender = _fakeGender();
    var name = _fakeFirstName(gender) + ' ' + _fakeLastName();
    var birthday = _fakeBirthday();

    return {
        'gender': gender,
        'name': name,
        'birthday': birthday
    }
};

var _generatePeople = function(numPeople) {
    var people = [];
    for (var i = 0; i < numPeople; i++) {
        var person = _generatePerson();
        people.push(person);
    }

    return people;
}

var _getPeople = function(callback) {
    db.collection('people').find().toArray(function(err, result) {
        if (err) {
            throw err;
        } else {
            callback(null, result);
        }
    });
}

module.exports = {

    randomFromFile: _randomFromFile,
    fakeFirstName: _fakeFirstName,
    fakeLastName: _fakeLastName,
    fakeGender: _fakeGender,
    fakeBirthday: _fakeBirthday,
    generatePerson: _generatePerson,
    generatePeople: _generatePeople,
    getPeople: _getPeople
};