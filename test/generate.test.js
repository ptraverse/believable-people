var generate = require('../generate.js');
var assert = require('assert');

it('should be able to generate a person', function(done) {
    this.timeout(1000);
    generate.generatePerson(function(person){
        console.log(person);
        assert(person.gender == 'male' || person.gender == 'female');
        assert(person.fName > '');

        done();
    });
});