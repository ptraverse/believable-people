var fs = require("fs");
var _ = require('underscore');
var moment = require('moment');
var db = require('mongoskin').db('mongodb://localhost:27017/bp');

var _randomFromFile = function(file) {
    var fileContents = fs.readFileSync(file);
    var lines = fileContents.toString().split('\n');

    return _.sample(lines, 1)[0].toLowerCase();
};

function _randomInt(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
}

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
    var start = 29888269; // Dec 12 1970
    var end = 1481581069; // Dec 12 2016
    var birthday = moment.unix(_randomInt(start, end)).format('YYYY-MM-DD');

    return birthday;
};



var _fakeHouse = function() {
    var start = 1;
    var end = 9999;
    var house = _randomInt(start, end);

    return house;
};

var _fakeStreet = function() {
    return _randomFromFile('./data/streets.csv');
};

var _fakeCityAndProvince = function() {
    return _randomFromFile('./data/canadian_cities.csv');
};

var _fakeAddress = function() {
    var house = _fakeHouse();
    var street = _fakeStreet();
    var cityProvince = _fakeCityAndProvince();

    return house + ' ' + street + ', ' + cityProvince;
};

/**
 * randomly make a string that looks like an email
 * Could be the first letter or the whole word of first and last name, maybe the birth year, maybe some special chars
 */
var _fakeEmail = function(firstName, lastName, birthday) {
    var first = [
        firstName,
        firstName[0]
    ];
    var specialChars = [
        '-',
        '',
        '.'
    ];
    var last = [
        lastName,
        lastName[0]
    ];
    var number = [
        birthday.substring(0,4), //the full birthyear eg 1988
        birthday.substring(2,4), //short form of birthyear eg 88
        ''
    ];
    var provider = _randomFromFile('./data/email_providers.csv');
    var fakeEmail = _.sample(first, 1);
    fakeEmail += _.sample(specialChars,1);
    fakeEmail += _.sample(last,1);
    fakeEmail += _.sample(number,1);
    fakeEmail += '@';
    fakeEmail += provider;

    return fakeEmail;
};

var _fakePhone = function() {
    var areaCode = _randomFromFile('./data/area_codes.csv');
    var firstPart = _randomInt(500,900);
    var secondPart = _randomInt(1000,9999);

    return areaCode + '-' + firstPart + '-' + secondPart;
};

var _generatePerson = function() {
    var gender = _fakeGender();
    var fName = _fakeFirstName(gender);
    var lName = _fakeLastName();
    var name = fName + ' ' + lName;
    var birthday = _fakeBirthday();
    var address = _fakeAddress();
    var email = _fakeEmail(fName, lName, birthday);
    var phone = _fakePhone();

    return {
        'gender': gender,
        'name': name,
        'birthday': birthday,
        'address': address,
        'email': email,
        'phone': phone
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
    fakeAddress: _fakeAddress,
    fakeEmail: _fakeEmail,
    fakePhone: _fakePhone,
    generatePerson: _generatePerson,
    generatePeople: _generatePeople,
    getPeople: _getPeople
};