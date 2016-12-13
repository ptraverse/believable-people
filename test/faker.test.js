var faker = require('../faker.js');
var assert = require('assert');
var moment = require('moment');

it('can get a random entry from a CSV file', function(done) {
    this.timeout(2000);
    var ffname = faker.randomFromFile('./data/female_first_names.csv');
    assert(ffname > '');

    var mfname = faker.randomFromFile('./data/male_first_names.csv');
    assert(mfname > '');

    var lname = faker.randomFromFile('./data/last_names.csv');
    assert(lname > '');

    var street = faker.randomFromFile('./data/streets.csv');
    assert(street > '');

    done();
});

it('can generate fake first names', function(done) {
    this.timeout(2000);
    var mfname = faker.fakeFirstName('male');
    assert(mfname > '');

    var ffname = faker.fakeFirstName('female');
    assert(ffname > '');

    done();
});

it('can generate fake last names', function(done) {
    this.timeout(2000);
    var lname = faker.fakeLastName();
    assert(lname > '');

    done();
});

it('can pick a gender', function(done) {
    this.timeout(500);
    var gender = faker.fakeGender();
    assert(gender == 'male' || gender == 'female');

    done();
});

it('can generate a fake birthday', function(done) {
    this.timeout(500);
    var birthday = faker.fakeBirthday();
    assert(moment(birthday).isValid());

    done();
});

it('can generate a fake address', function(done) {
    this.timeout(500);
    var address = faker.fakeAddress();
    assert(address > '');

    done();
});

it('can generate a fake email', function(done) {
    this.timeout(500);
    var fName = faker.fakeFirstName(faker.fakeGender());
    var lName = faker.fakeLastName();
    var birthday = faker.fakeBirthday();
    var email = faker.fakeEmail(fName, lName, birthday);
    assert(email > '');

    done();
});

it('can generate a fake phone', function(done) {
    this.timeout(500);
    var phone = faker.fakePhone();
    assert(phone > '');

    done();
});

it('can generate a person', function(done) {
    this.timeout(2000);
    var person = faker.generatePerson();
    console.log(person);
    assert(person.gender == 'male' || person.gender == 'female');
    assert(person.name > '');
    assert(moment(person.birthday).isValid());
    assert(person.address > '');
    assert(person.email > '');
    assert(person.phone > '');

    done();
});



it('can generate several people', function(done) {
    this.timeout(2000);
    var numPeople = 5;
    var people = faker.generatePeople(numPeople);
    assert(people.length == numPeople);

    done();
});